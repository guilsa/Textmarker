/**
 * @fileoverview Port for the toolbar button menu.
 * @module content/tbb-menu/port
 */
import { _PRIVPORT } from './../_shared/utils'

export default new _PRIVPORT({
  /**
   * @property {string} name - The name of the port.
   */
  name: 'tbbmenu',
  type: 'privileged',
  id: Math.random().toString().slice(2, 16),
  events: {
    CONNECTION: [
      'toggle:addon',
      'open:addon-page(tbb)',
      'error:browser-console'
    ]
  }
})
