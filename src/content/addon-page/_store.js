/**
 * @fileoverview Store for the addon page.
 * @module content/addon-page/_store
 */
import { _STORE } from './../_shared/utils'

export default new _STORE({
  /**
   * @property {object} events - The events handled by the store.
   */
  events: {
    ENV: {
      'toggled:sync': 'onToggledSync'
    }
  },
  env: 'addon-page',

  _get_download_option() {
    return browser.storage[this.area_settings].get().then(storage => {
      if (!storage || !storage.settings) return 'text';
      return storage.settings.history.download;
    });
  },
  _get_markers() {
    return browser.storage[this.area_settings].get().then(storage => storage.settings.markers);
  },
  _get_shortcuts() {
    return browser.storage[this.area_settings].get().then(storage => storage.settings.shortcuts);
  }
});
