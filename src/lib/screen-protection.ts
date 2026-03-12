/**
 * Screen Protection Utilities
 * Detects and prevents screenshots, screen recording, and unauthorized exports
 */

export const initializeScreenProtection = () => {
  // Prevent screenshots on Windows (Print Screen key)
  document.addEventListener('keydown', (e) => {
    if (e.key === 'PrintScreen') {
      e.preventDefault();
      showScreenshotNotification();
    }
  });

  // Prevent screenshots on Mac (Cmd+Shift+3, Cmd+Shift+4, Cmd+Shift+5)
  document.addEventListener('keydown', (e) => {
    if (
      (e.metaKey || e.ctrlKey) &&
      e.shiftKey &&
      (e.key === '3' || e.key === '4' || e.key === '5')
    ) {
      e.preventDefault();
      showScreenshotNotification();
    }
  });

  // Prevent Snipping Tool (Windows key + Shift + S)
  document.addEventListener('keydown', (e) => {
    if (e.metaKey && e.shiftKey && e.key === 's') {
      e.preventDefault();
      showScreenshotNotification();
    }
  });

  // Prevent right-click context menu
  document.addEventListener('contextmenu', (e) => {
    e.preventDefault();
    return false;
  });

  // Prevent drag and drop
  document.addEventListener('dragstart', (e) => {
    e.preventDefault();
    return false;
  });

  // Prevent text selection and copying
  document.addEventListener('selectstart', (e) => {
    if ((e.target as HTMLElement).tagName !== 'INPUT' && 
        (e.target as HTMLElement).tagName !== 'TEXTAREA') {
      e.preventDefault();
    }
  });

  // Prevent copy command
  document.addEventListener('copy', (e) => {
    if ((e.target as HTMLElement).tagName !== 'INPUT' && 
        (e.target as HTMLElement).tagName !== 'TEXTAREA') {
      e.preventDefault();
      showCopyBlockedNotification();
    }
  });

  // Prevent cut command
  document.addEventListener('cut', (e) => {
    if ((e.target as HTMLElement).tagName !== 'INPUT' && 
        (e.target as HTMLElement).tagName !== 'TEXTAREA') {
      e.preventDefault();
    }
  });

  // Prevent developer tools
  preventDevTools();

  // Monitor for screen recording
  monitorScreenRecording();

  // Prevent page export
  preventPageExport();
};

const showScreenshotNotification = () => {
  const notification = document.createElement('div');
  notification.className =
    'fixed top-4 right-4 bg-destructive text-destructive-foreground px-6 py-3 rounded-lg shadow-lg z-[9999] animate-pulse';
  notification.textContent = '⚠️ Screenshot detected and blocked';
  document.body.appendChild(notification);

  setTimeout(() => {
    notification.remove();
  }, 3000);
};

const showCopyBlockedNotification = () => {
  const notification = document.createElement('div');
  notification.className =
    'fixed top-4 right-4 bg-destructive text-destructive-foreground px-6 py-3 rounded-lg shadow-lg z-[9999] animate-pulse';
  notification.textContent = '⚠️ Content copying is disabled';
  document.body.appendChild(notification);

  setTimeout(() => {
    notification.remove();
  }, 3000);
};

const preventDevTools = () => {
  // Detect F12
  document.addEventListener('keydown', (e) => {
    if (e.key === 'F12') {
      e.preventDefault();
      showDevToolsBlockedNotification();
    }
  });

  // Detect Ctrl+Shift+I (Inspector)
  document.addEventListener('keydown', (e) => {
    if ((e.ctrlKey || e.metaKey) && e.shiftKey && e.key === 'i') {
      e.preventDefault();
      showDevToolsBlockedNotification();
    }
  });

  // Detect Ctrl+Shift+J (Console)
  document.addEventListener('keydown', (e) => {
    if ((e.ctrlKey || e.metaKey) && e.shiftKey && e.key === 'j') {
      e.preventDefault();
      showDevToolsBlockedNotification();
    }
  });

  // Detect Ctrl+Shift+C (Element Inspector)
  document.addEventListener('keydown', (e) => {
    if ((e.ctrlKey || e.metaKey) && e.shiftKey && e.key === 'c') {
      e.preventDefault();
      showDevToolsBlockedNotification();
    }
  });
};

const showDevToolsBlockedNotification = () => {
  const notification = document.createElement('div');
  notification.className =
    'fixed top-4 right-4 bg-destructive text-destructive-foreground px-6 py-3 rounded-lg shadow-lg z-[9999] animate-pulse';
  notification.textContent = '🔒 Developer tools are disabled';
  document.body.appendChild(notification);

  setTimeout(() => {
    notification.remove();
  }, 3000);
};

const monitorScreenRecording = () => {
  // Check for screen recording via MediaRecorder API
  if (navigator.mediaDevices && navigator.mediaDevices.getDisplayMedia) {
    const originalGetDisplayMedia = navigator.mediaDevices.getDisplayMedia;
    navigator.mediaDevices.getDisplayMedia = async function (...args) {
      showScreenRecordingNotification();
      throw new Error('Screen recording is not allowed on this page');
    };
  }
};

const showScreenRecordingNotification = () => {
  const notification = document.createElement('div');
  notification.className =
    'fixed top-4 right-4 bg-destructive text-destructive-foreground px-6 py-3 rounded-lg shadow-lg z-[9999] animate-pulse';
  notification.textContent = '⚠️ Screen recording attempt detected and blocked';
  document.body.appendChild(notification);

  setTimeout(() => {
    notification.remove();
  }, 3000);
};

const preventPageExport = () => {
  // Prevent saving page (Ctrl+S)
  document.addEventListener('keydown', (e) => {
    if ((e.ctrlKey || e.metaKey) && e.key === 's') {
      e.preventDefault();
      showExportBlockedNotification();
    }
  });

  // Prevent printing (Ctrl+P)
  document.addEventListener('keydown', (e) => {
    if ((e.ctrlKey || e.metaKey) && e.key === 'p') {
      e.preventDefault();
      showPrintBlockedNotification();
    }
  });

  // Override window.print
  window.print = () => {
    showPrintBlockedNotification();
  };
};

const showExportBlockedNotification = () => {
  const notification = document.createElement('div');
  notification.className =
    'fixed top-4 right-4 bg-destructive text-destructive-foreground px-6 py-3 rounded-lg shadow-lg z-[9999] animate-pulse';
  notification.textContent = '🔒 Page export is disabled';
  document.body.appendChild(notification);

  setTimeout(() => {
    notification.remove();
  }, 3000);
};

const showPrintBlockedNotification = () => {
  const notification = document.createElement('div');
  notification.className =
    'fixed top-4 right-4 bg-destructive text-destructive-foreground px-6 py-3 rounded-lg shadow-lg z-[9999] animate-pulse';
  notification.textContent = '🔒 Printing is disabled';
  document.body.appendChild(notification);

  setTimeout(() => {
    notification.remove();
  }, 3000);
};
