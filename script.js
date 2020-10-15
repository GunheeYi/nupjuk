document.addEventListener('keydown', function (event) {
  
  switch(event.key) {
    case 'm': jwplayer().setMute(); break;
    case 'f': jwplayer().setFullscreen(); break;
    case "ArrowRight": jwplayer().seek(jwplayer().getPosition()+10); break;
    case "ArrowLeft": jwplayer().seek(jwplayer().getPosition()-10); break;
    case "ArrowUp": jwplayer().setVolume(jwplayer().getVolume()<=90? jwplayer().getVolume()+10 : 100); break;
    case "ArrowDown": jwplayer().setVolume(jwplayer().getVolume()>=10? jwplayer().getVolume()-10 : 0); break;
    case " ": jwplayer().play(); break;
    case "0":
    case "1":
    case "2":
    case "3":
    case "4":
    case "5":
    case "6":
    case "7":
    case "8":
    case "9":
      jwplayer().seek(jwplayer().getDuration()/10*Number(event.key));
      break;
  }
});