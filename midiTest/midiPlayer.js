function fireEventEnded(e){if(e)if(document.createEvent){var t=document.createEvent("HTMLEvents");t.initEvent("ended",!1,!0),e.dispatchEvent(t)}else if(document.createEventObject){var r=document.createEventObject();e.fireEvent("onclick",r)}}function AudioPlayer(e,t,r){function n(){if(!f){if(l.length){var r=u.mozWriteAudio(l);l=l.slice(r)}l.length<h&&!e.finished&&(l=l.concat(e.generate(p))),f||e.finished&&!l.length||setTimeout(n,d),!f&&e.finished&&fireEventEnded(t)}}function a(r){if(e.finished)return y.disconnect(),void fireEventEnded(t);for(var n=r.outputBuffer.getChannelData(0),a=r.outputBuffer.getChannelData(1),i=e.generate(v),o=0;v>o;++o)n[o]=i[2*o],a[o]=i[2*o+1]}function i(e){for(var t=new Array(e.length),r=e.length-1;0!=r;r--)t[r]=Math.floor(32768*e[r]);return b.write(t.join(" "))}function n(){f||(b.bufferedDuration()<x&&i(e.generate(p)),f||e.finished||setTimeout(n,d),!f&&e.finished&&fireEventEnded(t))}function o(){b.write?n():setTimeout(o,10)}r||(r={});var s=r.latency||1,d=100*s,u=new Audio,c=window.AudioContext||window.webkitAudioContext,f=!1;if(u.mozSetup){u.mozSetup(2,sampleRate);var l=[],h=2*s*sampleRate,p=Math.floor(s*sampleRate);return n(),{type:"Firefox Audio",stop:function(){f=!0}}}if(c){context||(context=new c),sampleRate=context.sampleRate;var m=2,v=16384,y=context.createScriptProcessor(v,0,m);return y.onaudioprocess=function(e){a(e)},y.connect(context.destination),{stop:function(){y.disconnect(),f=!0},type:"Webkit Audio"}}var g=document.createElement("div");g.innerHTML='<embed type="application/x-shockwave-flash" id="da-swf" src="da.swf" width="8" height="8" allowScriptAccess="always" style="position: fixed; left:-10px;" />',document.body.appendChild(g);var b=document.getElementById("da-swf"),x=1e3*s,p=s*sampleRate;return o(),{stop:function(){b.stop(),f=!0},bufferedDuration:function(){return b.bufferedDuration()},type:"Flash Audio"}}function MidiFile(e){function t(e){var t=e.read(4),r=e.readInt32();return{id:t,length:r,data:e.read(r)}}function r(e){var t={};t.deltaTime=e.readVarInt();var r=e.readInt8();if(240==(240&r)){if(255==r){t.type="meta";var a=e.readInt8(),i=e.readVarInt();switch(a){case 0:if(t.subtype="sequenceNumber",2!=i)throw"Expected length for sequenceNumber event is 2, got "+i;return t.number=e.readInt16(),t;case 1:return t.subtype="text",t.text=e.read(i),t;case 2:return t.subtype="copyrightNotice",t.text=e.read(i),t;case 3:return t.subtype="trackName",t.text=e.read(i),t;case 4:return t.subtype="instrumentName",t.text=e.read(i),t;case 5:return t.subtype="lyrics",t.text=e.read(i),t;case 6:return t.subtype="marker",t.text=e.read(i),t;case 7:return t.subtype="cuePoint",t.text=e.read(i),t;case 32:if(t.subtype="midiChannelPrefix",1!=i)throw"Expected length for midiChannelPrefix event is 1, got "+i;return t.channel=e.readInt8(),t;case 47:if(t.subtype="endOfTrack",0!=i)throw"Expected length for endOfTrack event is 0, got "+i;return t;case 81:if(t.subtype="setTempo",3!=i)throw"Expected length for setTempo event is 3, got "+i;return t.microsecondsPerBeat=(e.readInt8()<<16)+(e.readInt8()<<8)+e.readInt8(),t;case 84:if(t.subtype="smpteOffset",5!=i)throw"Expected length for smpteOffset event is 5, got "+i;var o=e.readInt8();return t.frameRate={0:24,32:25,64:29,96:30}[96&o],t.hour=31&o,t.min=e.readInt8(),t.sec=e.readInt8(),t.frame=e.readInt8(),t.subframe=e.readInt8(),t;case 88:if(t.subtype="timeSignature",4!=i)throw"Expected length for timeSignature event is 4, got "+i;return t.numerator=e.readInt8(),t.denominator=Math.pow(2,e.readInt8()),t.metronome=e.readInt8(),t.thirtyseconds=e.readInt8(),t;case 89:if(t.subtype="keySignature",2!=i)throw"Expected length for keySignature event is 2, got "+i;return t.key=e.readInt8(!0),t.scale=e.readInt8(),t;case 127:return t.subtype="sequencerSpecific",t.data=e.read(i),t;default:return t.subtype="unknown",t.data=e.read(i),t}return t.data=e.read(i),t}if(240==r){t.type="sysEx";var i=e.readVarInt();return t.data=e.read(i),t}if(247==r){t.type="dividedSysEx";var i=e.readVarInt();return t.data=e.read(i),t}throw"Unrecognised MIDI event type byte: "+r}var s;0==(128&r)?(s=r,r=n):(s=e.readInt8(),n=r);var d=r>>4;switch(t.channel=15&r,t.type="channel",d){case 8:return t.subtype="noteOff",t.noteNumber=s,t.velocity=e.readInt8(),t;case 9:return t.noteNumber=s,t.velocity=e.readInt8(),t.subtype=0==t.velocity?"noteOff":"noteOn",t;case 10:return t.subtype="noteAftertouch",t.noteNumber=s,t.amount=e.readInt8(),t;case 11:return t.subtype="controller",t.controllerType=s,t.value=e.readInt8(),t;case 12:return t.subtype="programChange",t.programNumber=s,t;case 13:return t.subtype="channelAftertouch",t.amount=s,t;case 14:return t.subtype="pitchBend",t.value=s+(e.readInt8()<<7),t;default:throw"Unrecognised MIDI event type: "+d}}var n;stream=Stream(e);var a=t(stream);if("MThd"!=a.id||6!=a.length)throw"Bad .mid file - header not found";var i=Stream(a.data),o=i.readInt16(),s=i.readInt16(),d=i.readInt16();if(32768&d)throw"Expressing time division in SMTPE frames is not supported yet";ticksPerBeat=d;for(var u={formatType:o,trackCount:s,ticksPerBeat:ticksPerBeat},c=[],f=0;f<u.trackCount;f++){c[f]=[];var l=t(stream);if("MTrk"!=l.id)throw"Unexpected chunk - expected MTrk, got "+l.id;for(var h=Stream(l.data);!h.eof();){var p=r(h);c[f].push(p)}}return{header:u,tracks:c}}function Replayer(e,t){function r(){function e(e,r){a[e]&&!a[e].released&&a[e].noteOff(),generator=i.createNote(e,r),t.addGenerator(generator),a[e]=generator}function r(e,t){a[e]&&!a[e].released&&a[e].noteOff(t)}function n(e){i=PROGRAMS[e]||PianoProgram}var a={},i=PianoProgram;return{noteOn:e,noteOff:r,setProgram:n}}function n(){for(var r=null,n=null,a=null,i=0;i<s.length;i++)null!=s[i].ticksToNextEvent&&(null==r||s[i].ticksToNextEvent<r)&&(r=s[i].ticksToNextEvent,n=i,a=s[i].nextEventIndex);if(null!=n){var o=e.tracks[n][a];e.tracks[n][a+1]?s[n].ticksToNextEvent+=e.tracks[n][a+1].deltaTime:s[n].ticksToNextEvent=null,s[n].nextEventIndex+=1;for(var i=0;i<s.length;i++)null!=s[i].ticksToNextEvent&&(s[i].ticksToNextEvent-=r);h={ticksToEvent:r,event:o,track:n};var c=r/u,f=c/(d/60);p+=f*t.sampleRate}else h=null,p=null,m.finished=!0}function a(e){for(var r=new Array(2*e),a=e,o=0;;){if(!(null!=p&&a>=p)){a>0&&(t.generateIntoBuffer(a,r,o),p-=a);break}var s=Math.ceil(p);s>0&&(t.generateIntoBuffer(s,r,o),o+=2*s,a-=s,p-=s),i(),n()}return r}function i(){var e=h.event;switch(e.type){case"meta":switch(e.subtype){case"setTempo":d=6e7/e.microsecondsPerBeat}break;case"channel":switch(e.subtype){case"noteOn":l[e.channel].noteOn(e.noteNumber,e.velocity);break;case"noteOff":l[e.channel].noteOff(e.noteNumber,e.velocity);break;case"programChange":l[e.channel].setProgram(e.programNumber)}}}function o(e){console.log("replay"),e.write(a(44100)),setTimeout(function(){o(e)},10)}for(var s=[],d=120,u=e.header.ticksPerBeat,c=16,f=0;f<e.tracks.length;f++)s[f]={nextEventIndex:0,ticksToNextEvent:e.tracks[f].length?e.tracks[f][0].deltaTime:null};for(var l=[],f=0;c>f;f++)l[f]=r();var h,p=0;n();var m={replay:o,generate:a,finished:!1};return m}function Stream(e){function t(t){var r=e.substr(s,t);return s+=t,r}function r(){var t=(e.charCodeAt(s)<<24)+(e.charCodeAt(s+1)<<16)+(e.charCodeAt(s+2)<<8)+e.charCodeAt(s+3);return s+=4,t}function n(){var t=(e.charCodeAt(s)<<8)+e.charCodeAt(s+1);return s+=2,t}function a(t){var r=e.charCodeAt(s);return t&&r>127&&(r-=256),s+=1,r}function i(){return s>=e.length}function o(){for(var e=0;;){var t=a();if(!(128&t))return e+t;e+=127&t,e<<=7}}var s=0;return{eof:i,read:t,readInt32:r,readInt16:n,readInt8:a,readVarInt:o}}function SineGenerator(e){var t={alive:!0},r=sampleRate/e,n=0;return t.generate=function(e,t,a){for(;a;a--){var i=n/r,o=Math.sin(2*i*Math.PI);e[t++]+=o,e[t++]+=o,n++}},t}function SquareGenerator(e,t){var r={alive:!0},n=sampleRate/e,a=0;return r.generate=function(e,r,i){for(;i;i--){var o=a/n%1>t?1:-1;e[r++]+=o,e[r++]+=o,a++}},r}function ADSRGenerator(e,t,r,n,a,i){var o={alive:!0},s=sampleRate*n,d=sampleRate*(n+a),u=(t-r)/(d-s),c=null,f=null,l=r/(sampleRate*i),h=0;return o.noteOff=function(){o.released||(c=h,o.released=!0,f=c+sampleRate*i)},o.generate=function(n,a,i){if(o.alive){for(var p=new Array(2*i),m=0;2*i>m;m++)p[m]=0;for(e.generate(p,0,i),childOffset=0;i;)if(null!=c){if(!(f>h))return void(o.alive=!1);for(;i&&f>h;){var v=r-l*(h-c);n[a++]+=p[childOffset++]*v,n[a++]+=p[childOffset++]*v,h++,i--}}else if(s>h)for(;i&&s>h;){var v=t*h/s;n[a++]+=p[childOffset++]*v,n[a++]+=p[childOffset++]*v,h++,i--}else if(d>h)for(;i&&d>h;){var v=t-u*(h-s);n[a++]+=p[childOffset++]*v,n[a++]+=p[childOffset++]*v,h++,i--}else for(;i;)n[a++]+=p[childOffset++]*r,n[a++]+=p[childOffset++]*r,h++,i--}},o}function midiToFrequency(e){return 440*Math.pow(2,(e-69)/12)}function Synth(e){function t(e){a.push(e)}function r(e){var t=new Array(2*e);return n(e,t,0),t}function n(e,t,r){for(var n=r;r+2*e>n;n++)t[n]=0;for(var n=a.length-1;n>=0;n--)a[n].generate(t,r,e),a[n].alive||a.splice(n,1)}var a=[];return{sampleRate:e,addGenerator:t,generate:r,generateIntoBuffer:n}}if("undefined"==typeof MidiPlayer){var MidiPlayer=function(e,t,r,n,a){this.midi=e,this.target=document.getElementById(t),this.loop="undefined"==typeof r?!1:r,this.max_loop_ct=r?"undefined"==typeof n?1:0>=n?0:n:1,this.end_callback="function"==typeof a?a:null,this.debug_div=null,this.midiFile=null,this.synth=null,this.replayer=null,this.audio=null,this.ct=0,this.started=!1,this.listener_added=!1};MidiPlayer.prototype.setDebugDiv=function(e){this.debug_div="undefined"==typeof e?null:document.getElementById(e)},MidiPlayer.prototype.debug=function(e){this.debug_div&&(this.debug_div.innerHTML+=e+"<br/>")},MidiPlayer.prototype.stop=function(){this.started=!1,this.ct=0,this.audio&&(this.audio.stop(),this.audio=null),this.max_loop_ct>0&&this.end_callback&&this.end_callback()},MidiPlayer.prototype.play=function(){this.started&&this.stop(),this.started=!0;var e=this.target,t=this,r=this.midi,n=this.loop;window.addEventListener?this.listener_added||(this.listener_added=!0,e&&e.addEventListener("ended",function(){t.max_loop_ct<=0||++t.ct<t.max_loop_ct?(t.replayer=Replayer(t.midiFile,t.synth),t.audio=AudioPlayer(t.replayer,e,n),t.debug(r+": loop "+(1+t.ct))):t.max_loop_ct>0&&t.stop()},!1)):window.attachEvent,loadRemote(r,function(a){0==t.ct&&(t.midiFile=MidiFile(a),t.synth=Synth(44100)),t.replayer=Replayer(t.midiFile,t.synth),t.audio=AudioPlayer(t.replayer,e,n),t.debug(r+": loop "+(1+t.ct))})};var loadRemote=function(e,t){var r=new XMLHttpRequest;r.open("GET",e),r.overrideMimeType?r.overrideMimeType("text/plain; charset=x-user-defined"):r.setRequestHeader("Accept-Charset","x-user-defined"),r.onreadystatechange=function(){if(4==this.readyState&&200==this.status)if(IE_HACK){for(var e=BinaryToArray(r.responseBody).toArray(),n=[],a=e.length,i=String.fromCharCode,o=0;a>o;o++)n[o]=i(e[o]);t(n.join(""))}else{for(var e=this.responseText||"",n=[],a=e.length,i=String.fromCharCode,o=0;a>o;o++)n[o]=i(255&e.charCodeAt(o));t(n.join(""))}},r.send()},IE_HACK=/msie/i.test(navigator.userAgent)&&!/opera/i.test(navigator.userAgent);IE_HACK&&document.write('<script type="text/vbscript">\n    Function BinaryToArray(Binary)\n        Dim i\n        ReDim byteArray(LenB(Binary))\n        For i = 1 To LenB(Binary)\n            byteArray(i-1) = AscB(MidB(Binary, i, 1))\n        Next\n        BinaryToArray = byteArray\n    End Function\n</script>');var sampleRate=44100,context=null;PianoProgram={attackAmplitude:.2,sustainAmplitude:.1,attackTime:.02,decayTime:.3,releaseTime:.02,createNote:function(e,t){var r=midiToFrequency(e);return ADSRGenerator(SineGenerator(r),this.attackAmplitude*(t/128),this.sustainAmplitude*(t/128),this.attackTime,this.decayTime,this.releaseTime)}},StringProgram={createNote:function(e,t){var r=midiToFrequency(e);return ADSRGenerator(SineGenerator(r),.5*(t/128),.2*(t/128),.4,.8,.4)}},PROGRAMS={41:StringProgram,42:StringProgram,43:StringProgram,44:StringProgram,45:StringProgram,46:StringProgram,47:StringProgram,49:StringProgram,50:StringProgram}}
 
