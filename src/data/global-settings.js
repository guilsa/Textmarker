/**
 * @fileoverview Global settings for the extension.
 * @module data/global-settings
 */
export default {

  /**
   * @property {number} MAX_ENTRY_NAME_CHARS - The maximum number of characters for an entry name.
   */
  MAX_ENTRY_NAME_CHARS: 70,

  /**
   * @property {number} MAX_LOG_ENTRIES - The maximum number of log entries to keep.
   */
  MAX_LOG_ENTRIES: 20,

  /**
   * @property {object} NOTE_COLORS - The available colors for notes.
   */
  NOTE_COLORS: {
    TURQUOISE: '#b9e4ec',
    GREEN: '#ccffcc',
    YELLOW: '#ffffcc',
    ORANGE: '#ffeebb',
    RED: '#ffcccc',
    PURPLE: '#eeccff',
    BLUE: '#bbeeff',
    WHITE: '#eeeeee'
  }
}
