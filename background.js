chrome.runtime.onInstalled.addListener(function() {
  //拡張機能がインストールされたときや更新された時に関数内を実行する
  chrome.storage.sync.set({color: '#3aa757'}, function() {
    //storage APIの命令
      console.log("The color is green.");
  });
});