export default function formatDateWithoutHours(timestamp) {
    const date = new Date(timestamp);
    const options = { 
      weekday: 'short', 
      day: 'numeric', 
      year: 'numeric',
    };
    return date.toLocaleString('en-US', options);
  }