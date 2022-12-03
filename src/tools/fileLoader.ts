export const fileLoader = (url: string): void => {
  const xmlHttp = new XMLHttpRequest();
  xmlHttp.onreadystatechange = () => {
    if (xmlHttp.readyState === 4 && xmlHttp.status === 200) {
      const blobUrl = window.URL.createObjectURL(xmlHttp.response);
      const e = document.createElement('a');
      e.href = blobUrl;
      e.download = blobUrl.substring(blobUrl.lastIndexOf('/') + 1);
      document.body.appendChild(e);
      e.click();
      document.body.removeChild(e);
    }
  };
  xmlHttp.responseType = 'blob';
  xmlHttp.open('GET', url, true);
  xmlHttp.send(null);
}