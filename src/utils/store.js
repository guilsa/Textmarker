import { _MODULE } from './module'
import _DEFAULT_STORAGE from '../data/default-storage'

/**
 * @class _STORE
 * @description Manages the extension's data, including settings, history, and page notes.
 * It handles data retrieval from local and sync storage, and merges them based on user preferences.
 * @extends _MODULE
 */
export class _STORE extends _MODULE {

  /**
   * @constructor
   * @param {object} obj - The initial properties of the object.
   */
  constructor(obj) {
    super(obj)

    /**
     * @property {boolean} initialized - Whether the store has been initialized.
     */
    this.initialized = false;
    /**
     * @property {boolean} initializing - Whether the store is currently being initialized.
     */
    this.initializing = false;

    /**
     * @property {string} area_settings - The storage area for settings ('sync' or 'local').
     */
    this.area_settings = _DEFAULT_STORAGE.sync.settings ? 'sync' : 'local';
    /**
     * @property {string} area_history - The storage area for history ('sync' or 'local').
     */
    this.area_history = _DEFAULT_STORAGE.sync.history ? 'sync' : 'local';
    /**
     * @property {string} area_pagenotes - The storage area for page notes ('sync' or 'local').
     */
    this.area_pagenotes = _DEFAULT_STORAGE.sync.pagenotes ? 'sync' : 'local';
  }

  /**
   * @method init
   * @description Initializes the store by reading the sync settings from local storage.
   * @returns {Promise} A promise that resolves when the store is initialized.
   */
  init() {
    return browser.storage.local.get().then(storage => {
      if (storage && storage.sync) {
        this.setAreas(storage.sync);
      }
    });
  }

  /**
   * @method setAreas
   * @description Sets the storage areas for settings, history, and page notes.
   * @param {object} sync - The sync settings.
   */
  setAreas(sync) {
    for (let area in sync) {
      this['area_' + area] = sync[area] ? 'sync' : 'local';
    }
  }

  /**
   * @method onToggledSync
   * @description Handles the event when the sync settings are toggled.
   */
  onToggledSync() {
    this.init().then(() => this.emit('set-areas-after-sync-change'));
  }

  /**
   * @method get
   * @description Gets data from the store.
   * @param {string} [field='storage'] - The field to get.
   * @returns {Promise} A promise that resolves with the requested data.
   */
  get(field = 'storage') {
    if (this.initializing) {
      return (new Promise(r => window.setTimeout(() => r(this.get(field)), 10)));
    }
    const meth = this['_get_' + field];
    if (!meth) throw('field ' + field + ' doesn\'t exist');

    if (!this.initialized) {
      this.initializing = true;
      this.initialized = true;

      return this.init().then(() => {
        this.initializing = false;
        return this['_get_' + field]();
      });
    }
    return this['_get_' + field]();
  }

  /**
   * @method _get_storage
   * @description Gets the entire storage object, merging local and sync storage.
   * It prioritizes local storage for version and logs, and sync storage for settings if sync is enabled.
   * @returns {Promise} A promise that resolves with the storage object.
   * @private
   */
  _get_storage() {
    return browser.storage.local.get().then(localStorage => {
      return browser.storage.sync.get().then(syncedStorage => {
        ['version', 'logs'].forEach(field => {
          localStorage[field] = localStorage[field] || syncedStorage[field];
        });
        if (this.area_settings === 'sync') localStorage.settings = syncedStorage.settings;
        return this._get_history().then(history => {
          localStorage.history = history;
          return localStorage;
        });
      });
    });
  }

  /**
   * @method _get_local_storage
   * @description Gets the local storage object.
   * @returns {Promise} A promise that resolves with the local storage object.
   * @private
   */
  _get_local_storage() {
    return browser.storage.local.get();
  }

  /**
   * @method _get_synced_storage
   * @description Gets the sync storage object.
   * @returns {Promise} A promise that resolves with the sync storage object.
   * @private
   */
  _get_synced_storage() {
    return browser.storage.sync.get();
  }

  /**
   * @method _get_history
   * @description Gets the history object, merging local and sync history.
   * @returns {Promise} A promise that resolves with the history object.
   * @private
   */
  _get_history() {
    return browser.storage.sync.get().then(syncedStorage => {
      const syncedHistory = syncedStorage.history;

      return browser.storage.local.get().then(localStorage => {
        const localHistory = localStorage.history;
        if (!syncedHistory) return localHistory;
        if (!localHistory) return syncedHistory;

        //syncedHistory.order = syncedHistory.order.concat(localHistory.order);
        for (let e in localHistory.entries) syncedHistory.entries[e] = localHistory.entries[e];

        return syncedHistory;
      });
    });
  }

  /**
   * @method _get_settings
   * @description Gets the settings object.
   * @returns {Promise} A promise that resolves with the settings object.
   * @private
   */
  _get_settings() {
    return browser.storage[this.area_settings].get().then(storage => storage.settings || _DEFAULT_STORAGE.settings);
  }

  /**
   * @method _get_logs
   * @description Gets the logs.
   * @returns {Promise} A promise that resolves with the logs.
   * @private
   */
  _get_logs() {
    return browser.storage.local.get().then(localStorage => {
      if (!localStorage || !localStorage.logs) return [];
      return localStorage.logs;
    });
  }

  /**
   * @method _get_version
   * @description Gets the extension version.
   * @returns {Promise} A promise that resolves with the version.
   * @private
   */
  _get_version() {
    return browser.storage.local.get().then(localStorage => {
      if (!localStorage || !localStorage.version) {
        return browser.storage.sync.get().then(syncedStorage => syncedStorage.version || '');
      }
      return localStorage.version;
    });
  }
}
