var animateClass=function(){var testNode=document.createElement("div");var transitionEnd="transitionend",animationEnd="animationend",transitionProperty="transition",animationProperty="animation";if(!("ontransitionend"in window)){if("onwebkittransitionend"in window){transitionEnd+=" webkitTransitionEnd";transitionProperty="webkitTransition"}else if("onotransitionend"in testNode||navigator.appName==="Opera"){transitionEnd+=" oTransitionEnd";transitionProperty="oTransition"}}if(!("onanimationend"in window)){if("onwebkitanimationend"in window){animationEnd+=" webkitAnimationEnd";animationProperty="webkitAnimation"}else if("onoanimationend"in testNode){animationEnd+=" oAnimationEnd";animationProperty="oAnimation"}}function addClass(node,className){var current=node.className||"";if((" "+current+" ").indexOf(" "+className+" ")===-1){node.className=current?current+" "+className:className}}function delClass(node,className){var current=node.className||"";node.className=(" "+current+" ").replace(" "+className+" "," ").trim()}function getMaxTimeout(node){var timeout=0,tDuration=0,tDelay=0,aDuration=0,aDelay=0,ratio=5/3,styles;if(window.getComputedStyle){styles=window.getComputedStyle(node),tDuration=getMaxTime(styles[transitionProperty+"Duration"])||tDuration;tDelay=getMaxTime(styles[transitionProperty+"Delay"])||tDelay;aDuration=getMaxTime(styles[animationProperty+"Duration"])||aDuration;aDelay=getMaxTime(styles[animationProperty+"Delay"])||aDelay;timeout=Math.max(tDuration+tDelay,aDuration+aDelay)}return timeout*1e3*ratio}function getMaxTime(str){var maxTimeout=0,time;if(!str)return 0;str.split(",").forEach(function(str){time=parseFloat(str);if(time>maxTimeout)maxTimeout=time});return maxTimeout}function animateClass(node,className,callback){var timeout,tid;if(!animationEnd&&!transitionEnd){return callback()}var called=false;function onAnimateEnd(event){if(event&&event.target!==node)return;if(called===true)return;called=true;if(tid)clearTimeout(tid);delClass(node,className);node.removeEventListener(animationEnd,onAnimateEnd);node.removeEventListener(transitionEnd,onAnimateEnd);callback&&callback()}addClass(node,className);timeout=getMaxTimeout(node);tid=setTimeout(onAnimateEnd,timeout);node.addEventListener(animationEnd,onAnimateEnd);node.addEventListener(transitionEnd,onAnimateEnd)}return animateClass}();