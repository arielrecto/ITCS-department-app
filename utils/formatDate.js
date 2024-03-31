export default function formatDate(timestamp) {
    const date = new Date(timestamp);
    const options = { 
      weekday: 'short', 
      day: 'numeric', 
      year: 'numeric', 
      hour: 'numeric', 
      minute: 'numeric',
    };
    return date.toLocaleString('en-US', options);
  }