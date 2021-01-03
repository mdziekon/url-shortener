interface LogEntryMeta {
  /**
   * Log producer's identifier, allowing log consumers to track the origin of the entry.
   */
  producerId: string;

  /**
   * Severity of the log entry.
   */
  level: 'trace' | 'debug' | 'info' | 'warn' | 'error' | 'fatal';
}

export interface LoggingPort {
  log: (value: unknown, meta: LogEntryMeta) => void;
}
