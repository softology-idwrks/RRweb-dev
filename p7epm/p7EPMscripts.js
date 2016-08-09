
/* 

  ================================================
  PVII Elevator Panel Magic scripts
  Copyright (c) 2008 Project Seven Development
  www.projectseven.com
  Version:  1.3.4 - script build: 1-13
  ================================================
  
*/

var p7EPMi=false,p7EPMa=false,p7EPMctl=[],p7EPMmo,p7EPMmanim=false;
function P7_EPMset(){
	var i,h,sh,hd,x,v;
	if(!document.getElementById){
		return;
	}
	sh='.p7epm_cwrapper {overflow:hidden;display:none}\n';
	if(document.styleSheets){
		h='\n<st' + 'yle type="text/css">\n'+sh+'\n</s' + 'tyle>';
		document.write(h);
	}
	else{
		h=document.createElement('style');
		h.type='text/css';
		h.appendChild(document.createTextNode(sh));
		hd=document.getElementsByTagName('head');
		hd[0].appendChild(h);
	}
}
P7_EPMset();
function P7_EPMaddLoad(){
	if(!document.getElementById){
		return;
	}
	if(window.addEventListener){
		window.addEventListener("load",P7_initEPM,false);
		window.addEventListener("unload",P7_EPMff,false);
	}
	else if(window.attachEvent){
		window.attachEvent("onload",P7_initEPM);
	}
	else if(typeof window.onload=='function'){
		var p7vloadit=onload;
		window.onload=function(){
			p7vloadit();
			P7_initEPM();
		};
	}
	else{
		window.onload=P7_initEPM;
	}
	p7EPMi=true;
}
function P7_EPMff(){
	return;
}
function P7_opEPM(){
	var h='',hh,b,cn,sD,d,tB,cTD,mD;
	if(!document.getElementById){
		return;
	}
	p7EPMctl[p7EPMctl.length]=arguments;
	if(!p7EPMi){
		P7_EPMaddLoad();
	}
}
function P7_initEPM(){
	var i,j,x,tB,tD,tA,tg,cP,dh,tr,ob;
	for(i=0;i<p7EPMctl.length;i++){
		tB=document.getElementById(p7EPMctl[i][0]);
		if(tB){
			tB.p7opt=p7EPMctl[i];
			if(navigator.appVersion.indexOf("MSIE 5")>-1){
				tB.p7opt[2]=0;
			}
			tB.p7trgs=[];
			tD=document.getElementById(tB.id.replace("EPM_","EPMt_"));
			if(tD){
				tA=tD.getElementsByTagName("A");
				tg='p7EPMtrg';
				x=0;
				for(j=0;j<tA.length;j++){
					if(tA[j].id && tA[j].id.indexOf(tg)===0){
						tA[j].onclick=function(){
							return P7_EPMtrig(this);
						};
						if(tB.p7opt[4]==1){
							tA[j].onmouseover=function(){
								if(p7EPMmo){
									clearTimeout(p7EPMmo);
								}
								p7EPMmanim=true;
								p7EPMmo=setTimeout("P7_EPMmtrg('"+this.id+"',1)",200);
							};
							tA[j].onmouseout=function(){
								if(p7EPMmo){
									clearTimeout(p7EPMmo);
								}
								p7EPMmanim=false;
							};
						}
						tB.p7trgs[x]=tA[j];
						x++;
						tA[j].p7state='closed';
						tA[j].p7EPMpr=tB.id;
						cP=document.getElementById(tA[j].id.replace("trg","w"));
						if(cP){
							tA[j].p7EPMw=cP.id;
						}
						else{
							tA[j].p7EPMw=false;
						}
					}
				}
				tr=tB.id.replace("_","trg")+"_"+tB.p7opt[1];
				ob=document.getElementById(tr);
				if(ob){
					P7_EPMopen(ob);
				}
				if(tB.p7opt[5]>0){
					P7_EPMrotate(tB.id,tB.p7opt[5]);
				}
			}
		}
	}
	for(i=0;i<p7EPMctl.length;i++){
		P7_EPMurl(p7EPMctl[i][0]);
	}
	p7EPMa=true;
}
function P7_EPMmtrg(d){
	P7_EPMtrig(document.getElementById(d),1);
}
function P7_EPMctl(tr,ac,bp){
	var tA=document.getElementById(tr);
	if(tA){
		if(ac=='open'){
			if(tA.p7state!='open'){
				P7_EPMtrig(tA,0,bp);
			}
		}
		else if(ac=='close'){
			if(tA.p7state!='closed'){
				P7_EPMtrig(tA,0,bp);
			}
		}
		else if(ac=='trigger'){
			P7_EPMtrig(tA,0,bp);
		}
	}
	return false;
}
function P7_EPMall(dv,ac){
	var i,j,mD,a;
	if(dv=='all'){
		for(i=0;i<p7EPMctl.length;i++){
			if(ac=='open'){
				mD=document.getElementById(p7EPMctl[i][0]);
				for(j=0;j<mD.p7trgs.length;j++){
					if(mD.p7trgs[j].p7state!='open'){
						P7_EPMopen(mD.p7trgs[j]);
					}
				}
			}
			else{
				P7_EPMtoggle(p7EPMctl[i][0]);
			}
		}
	}
	else{
		mD=document.getElementById(dv);
		if(mD){
			if(ac=='open'){
				for(j=0;j<mD.p7trgs.length;j++){
					if(mD.p7trgs[j].p7state!='open'){
						P7_EPMopen(mD.p7trgs[j]);
					}
				}
			}
			else{
				P7_EPMtoggle(dv);
			}
		}
	}
}
function P7_EPMtrig(a,mv,bp){
	var i,j,mD,tB,m=true;
	if(!p7EPMa&&!bp){
		return false;
	}
	if(mv==1&&a.p7state=='open'){
		return false;
	}
	if(!mv&&p7EPMmanim){
		return false;
	}
	mD=document.getElementById(a.p7EPMpr);
	if(a.p7EPMw){
		m=false;
	}
	if(mD.p7rtmr){
		clearTimeout(mD.p7rtmr);
	}
	if(mD.p7opt[3]==1){
		P7_EPMtoggle(a.p7EPMpr,a);
	}
	else if(mD.p7opt[3]==2){
		for(j=0;j<p7EPMctl.length;j++){
			P7_EPMtoggle(p7EPMctl[j][0],a);
		}
	}
	if(a.p7state=='open'){
		if(mD.p7opt[7]==1 && mD.p7opt[3]>0){
			return m;
		}
		else{
			P7_EPMclose(a);
		}
	}
	else{
		P7_EPMopen(a);
	}
	return m;
}
function P7_EPMtoggle(dv,a){
	var i,mD;
	mD=document.getElementById(dv);
	if(mD){
		for(i=0;i<mD.p7trgs.length;i++){
			if(mD.p7trgs[i].p7state!='closed'){
				if(mD.p7trgs[i]!=a){
					P7_EPMclose(mD.p7trgs[i]);
				}
			}
		}
	}
}
function P7_EPMopen(a){
	var i,mD,wD,cD,ch,th,ov=false,cl;
	a.p7state='open';
	cl=a.className;
	a.className=(cl&&cl.length>0)?cl+' p7epm_open':'p7epm_open';
	mD=document.getElementById(a.p7EPMpr);
	wD=document.getElementById(a.p7EPMw);
	if(wD){
		cD=document.getElementById(wD.id.replace('w','c'));
		if(p7EPMa&&mD.p7opt[2]>0){
			if(navigator.userAgent.toLowerCase().indexOf("gecko")>-1){
				if(P7_EPMov(cD)){
					cD.style.overflow="hidden";
					cD.p7ov=true;
				}
			}
			if(wD.p7epmG){
				clearTimeout(wD.p7epmG);
			}
			wD.style.overflow="hidden";
			ch=1;
			wD.style.height=ch+"px";
			wD.style.display='block';
			th=cD.offsetHeight;
			P7_EPMglide(wD.id,ch,th,mD.p7opt[2]);
		}
		else{
			wD.style.height="auto";
			wD.style.display="block";
			p7EPMmanim=false;
		}
	}
}
function P7_EPMclose(a){
	var i,mD,wD,cD,ch,th,ov=false,r1;
	a.p7state='closed';
	r1=/\p7epm_open/;
	a.className=a.className.replace(r1,'');
	mD=document.getElementById(a.p7EPMpr);
	wD=document.getElementById(a.p7EPMw);
	if(wD){
		cD=document.getElementById(wD.id.replace('w','c'));
		if(mD.p7opt[2]>0){
			if(navigator.userAgent.toLowerCase().indexOf("gecko")>-1){
				if(P7_EPMov(cD)){
					cD.style.overflow="hidden";
					cD.p7ov=true;
				}
			}
			if(wD.p7epmG){
				clearTimeout(wD.p7epmG);
			}
			wD.style.overflow="hidden";
			ch=wD.offsetHeight;
			th=0;
			P7_EPMglide(wD.id,ch,th,mD.p7opt[2]);
		}
		else{
			wD.style.height="auto";
			wD.style.display="none";
		}
	}
}
function P7_EPMrotate(dv,md,pn){
	var i;
	tB=document.getElementById(dv);
	if(md===0){
		if(tB.p7rtmr){
			clearTimeout(tB.p7rtmr);
		}
		if(tB.p7rtrun){
			tB.p7rtcntr--;
			tB.p7rtrun=false;
		}
		return;
	}
	else{
		if(tB.p7rtrun){
			return;
		}
	}
	if(tB&&tB.p7trgs){
		if(md>0){
			tB.p7rtmd=md;
			tB.p7rtcy=1;
			tB.p7rtcntr=1;
		}
		if(!pn){
			pn=-1;
			for(i=0;i<tB.p7trgs.length;i++){
				if(tB.p7trgs[i].p7state=='open'){
					pn=i;
					break;
				}
			}
		}
		else{
			pn--;
		}
		pn=(pn<-1)?0:pn;
		pn=(pn>tB.p7trgs.length-1)?tB.p7trgs.length-1:pn;
		if(md>0){
			tB.p7rtsp=pn;
		}
		if(tB.p7rtmr){
			clearTimeout(tB.p7rtmr);
		}
		tB.p7rtmr=setTimeout("P7_EPMrunrt('"+dv+"',"+pn+")",10);
	}
}
function P7_EPMrunrt(dv,n){
	var a,tB;
	tB=document.getElementById(dv);
	tB.p7rtrun=true;
	if(tB.p7rtmr){
		clearTimeout(tB.p7rtmr);
	}
	if(n>-1&&n<tB.p7trgs.length){
		a=tB.p7trgs[n];
		if(a.p7state!="open"){
			P7_EPMtrig(a,0,true);
		}
		tB.p7rtcntr++;
	}
	n++;
	if(tB.p7rtcntr>tB.p7trgs.length){
		tB.p7rtcy++;
		tB.p7rtcntr=1;
	}
	if(n>=tB.p7trgs.length){
		n=0;
	}
	if(tB.p7rtcy>tB.p7rtmd){
		if(tB.p7rtsp==-1){
			tB.p7rtmr=setTimeout("P7_EPMall('"+dv+"','all')",tB.p7opt[6]);
		}
		else{
			tB.p7rtmr=setTimeout("P7_EPMctl('"+	tB.p7trgs[n].id+"','open',true)",tB.p7opt[6]);
		}
		tB.p7rtrun=false;
	}
	else{
		tB.p7rtmr=setTimeout("P7_EPMrunrt('"+dv+"',"+n+")",tB.p7opt[6]);
	}
}
function P7_EPMglide(dd,ch,th,p){
	var m,d,cD,dy=10,inc=10,pc=0.15;
	d=document.getElementById(dd);
	m=(ch<=th)?0:1;
	if(p==2){
		tt=Math.abs( parseInt( Math.abs(th)-Math.abs(ch),10 ) );
		inc=(tt*pc<1)?1:tt*pc;
	}
	inc=(m==1)?inc*-1:inc;
	d.style.height=ch+"px";
	if(ch==th){
		if(th===0){
			d.style.display="none";
		}
		else{
			p7EPMmanim=false;
		}
		d.style.height="auto";
		cD=document.getElementById(d.id.replace("w","c"));
		if(cD.p7ov){
			cD.style.overflow="auto";
			cD.p7ov=false;
		}
	}
	else{
		ch+=inc;
		if(m===0){
			ch=(ch>=th)?th:ch;
		}
		else{
			ch=(ch<=th)?th:ch;
		}
		d.p7epmG=setTimeout("P7_EPMglide('"+dd+"',"+ch+","+th+","+p+")",dy);
	}
}
function P7_EPMurl(dv){
	var i,h,s,x,d='epm',a,n=dv.replace("p7EPM_","");
	if(document.getElementById){
		h=document.location.search;
		if(h){
			h=h.replace('?','');
			s=h.split(/[=&]/g);
			if(s&&s.length){
				for(i=0;i<s.length;i+=2){
					if(s[i]==d){
						x=s[i+1];
						if(n!=x.charAt(0)){
							x=false;
						}
						if(x){
							a=document.getElementById('p7EPMtrg'+x);
							if(a&&a.p7state!="open"){
								P7_EPMtrig(a,0,true);
							}
						}
					}
				}
			}
		}
		h=document.location.hash;
		if(h){
			x=h.substring(1,h.length);
			if(n!=x.charAt(3)){
				x=false;
			}
			if(x&&x.indexOf(d)===0){
				a=document.getElementById('p7EPMtrg'+x.substring(3));
				if(a&&a.p7state!="open"){
					P7_EPMtrig(a,0,true);
				}
			}
		}
	}
}
function P7_EPMov(ob){
	var s,m;
	s=ob.style.overflow;
	if(!s){
		if(ob.currentStyle){
			s=ob.currentStyle.overflow;
		}
		else if(document.defaultView.getComputedStyle(ob,"")){
			s=document.defaultView.getComputedStyle(ob,"").getPropertyValue("overflow");
		}
	}
	m=(s&&s=='auto')?true:false;
	return m;
}
