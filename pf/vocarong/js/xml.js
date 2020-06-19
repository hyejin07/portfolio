//$(function(){
	/***************************
		xml
	****************************/
	console.log("xml load");
    var xmlDoc;
    var req = new XMLHttpRequest();
    var narr_audio2;
    var narr_audio4;
    req.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            myFunction(this);
        }
    };
    req.open("GET", "xml/xmlData.xml", true);
    req.send();
    function myFunction(xml) {
        xmlDoc = xml.responseXML;
        console.log("xml load complete");
        //localStorage.setItem('xmlData', new XMLSerializer().serializeToString(xmlDoc));
        narrXml();
    }
    function narrXml(){
        var len2 = xmlDoc.getElementsByTagName("scene"+2)[cntLesson-1].getElementsByTagName("voca").length;
        var len4 = xmlDoc.getElementsByTagName("scene"+4)[cntLesson-1].getElementsByTagName("voca").length;
        var audio2 = [];
        var audio4 = [];
        for(var i = 0;i<len2;i++){
            //console.log(xmlDoc.getElementsByTagName("scene"+2)[cntLesson-1].getElementsByTagName("voca")[i].getAttribute("mp3"));
            audio2.push(xmlDoc.getElementsByTagName("scene"+2)[cntLesson-1].getElementsByTagName("voca")[i].getAttribute("mp3"));
        }
        for(var i = 0;i<len4;i++){
            //console.log(xmlDoc.getElementsByTagName("scene"+4)[cntLesson-1].getElementsByTagName("voca")[i].getAttribute("mp3"));
            audio4.push(xmlDoc.getElementsByTagName("scene"+4)[cntLesson-1].getElementsByTagName("voca")[i].getAttribute("mp3"));
        }
        narr_audio2 = arrayAudio(audio2);
        narr_audio4 = arrayAudio(audio4);
    }
//})