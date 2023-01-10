for (let i = 0; i <= 35; i++) {
	document.querySelector('.grid-container').innerHTML += `
	<img class="img img-${i} grid-item responsive" src="img/${i}.jpg"  data-num="${i}" alt="image ${i}"></img>
	`;
}
document.addEventListener('DOMContentLoaded', function() {

	let body = document.querySelector('body'),
	header = document.getElementById('header'),
	ukFlag = document.querySelector('#uk-flag'),
	bgFlag = document.querySelector('#bg-flag'),
	translateLang = document.querySelectorAll('.translate-lang'),
	navToggle = document.querySelector('.nav-toggle'),
	navBtn = document.querySelectorAll('.nav-btn'),
	modal = document.querySelector('#myModal'),
	modalImg = document.querySelector("#modalImg"),
	imgThumb = document.querySelectorAll('.img'),
	closeBtn = document.querySelectorAll('.close'),
	leftArrow = document.querySelector('.left-arrow'),
	rightArrow = document.querySelector('.right-arrow'),
	submitMail = document.querySelectorAll('.contact-submit');

	ukFlag.onclick = (event) => { 
		//English
		translateLang.forEach((langField) => {
			if (langField.classList.contains('en-lang')) { 
				//English translation
				langField.classList.remove('hidden');
			} else { 
				//Bulgarian translation
				langField.classList.add('hidden');
			}
		});
	}

	bgFlag.onclick = (event) => {
		//Bulgarian
		translateLang.forEach((langField) => {
			if (langField.classList.contains('bg-lang')) { 
				//Bulgarian translation
				langField.classList.remove('hidden');
			} else { 
				//English translation
				langField.classList.add('hidden');
			}
		});
	}

	navToggle.onclick = (event) => {
		if (header.classList.contains('mobile-shown')) {
			header.classList.remove('mobile-shown');
		} else {
			header.classList.add('mobile-shown');
		}
	}
	
	submitMail.onclick = (event) => {
		if (header.classList.contains('mobile-shown')) {
			header.classList.remove('mobile-shown');
		} else {
			header.classList.add('mobile-shown');
		}
	}
	
	for (i = 0; i < navBtn.length; i++) {
		//Add event listener to all navigation buttons, to scroll to the target element
		navBtn[i].addEventListener('click', function (i, el) {
			event.stopPropagation();
			header.classList.remove('mobile-shown');
			const target = document.getElementById(el.target.dataset.target);
			const yOffset = -header.clientHeight;
			window.scrollTo({
				top: target.getBoundingClientRect().top + window.pageYOffset + yOffset,
				behavior: 'smooth'
			});
		}.bind(this, i));
	}
	
	var prevScrollpos = window.pageYOffset;
	window.onscroll = function () {
		var currentScrollPos = window.pageYOffset;
		if (window.pageYOffset + document.querySelector("#navbar").scrollHeight + 40
			< document.getElementById("masonry").offsetTop) {
			document.getElementById("header").classList.remove('padding-zero');
			document.querySelector(".logo").classList.remove('top-position');
		} else {
			document.getElementById("header").classList.add('padding-zero');
			document.querySelector(".logo").classList.add('top-position');
		}
		prevScrollpos = currentScrollPos;
	}
	
	closeBtn.onclick = (event) => {
		//When the user clicks the modal close button
		closeModal(event);
	}
	
	window.onclick = (event) => {
		//When the user clicks anywhere outside of the modal, close it
		closeModal(event);
	}
	
	closeModal = (event) => {
		if (event.target == modal || event.target.className === 'close') {
			//Close the img modal and remove active status for img thumbs
			event.stopPropagation();
			modal.classList.add('display-none');
			modal.classList.remove('display-block');
			modalImg.src = '';
			imgThumb.forEach((el) => el.classList.remove('active'));
			body.classList.remove('disable-scroll');
		}
	}
	
	leftArrow.onclick = (event) => {
		const activeImgNum = parseInt(document.querySelector('.active').dataset.num);
		if (leftArrow.classList.contains('disabled') || !activeImgNum) {
			//Viewing first img
			return
		}
		//Change the active img thumb and set the new modal img src
		imgThumb.item(activeImgNum).classList.remove('active');
		imgThumb.item(activeImgNum - 1).classList.add('active');
		modalImg.src = imgThumb.item(activeImgNum - 1).src;
		if (activeImgNum - 1 === 0) {
			//Disable the left arrow if the previous img is the first
			leftArrow.classList.add('disabled');
		}
		//Enable the right arrow
		rightArrow.classList.remove('disabled');
	}
	
	rightArrow.onclick = (event) => {
		const activeImgNum = parseInt(document.querySelector('.active').dataset.num);
		if (rightArrow.classList.contains('disabled') || activeImgNum === imgThumb.length - 1) {
			//Viewing last img
			return
		}
		//Change the active img thumb and set the new modal img src
		imgThumb.item(activeImgNum).classList.remove('active');
		imgThumb.item(activeImgNum + 1).classList.add('active');
		modalImg.src = imgThumb.item(activeImgNum + 1).src;
		if (activeImgNum + 1 === imgThumb.length - 1) {
			//Disable the left arrow if the previous img is the first
			rightArrow.classList.add('disabled');
		}
		//Enable the right arrow
		leftArrow.classList.remove('disabled');
	}

	for (i = 0; i < imgThumb.length; i++) {
		//Add event listener to all img thumbs, enable and disable carousel arrows
		imgThumb[i].addEventListener('click', function (i) {
			//Open img modal, apply new img, 
			event.stopPropagation();
			modal.classList.add('display-block');
			modal.classList.remove('display-none');
			body.classList.add('disable-scroll');
			imgThumb[i].classList.add('active');
	
			//Calculate modal size based on landscape or portrait of the image and the device size!
	
			modalImg.src = imgThumb[i].src;
			if (i === 0) {
				//Disable arrow if first img is opened
				leftArrow.classList.add('disabled');
			} else {
				leftArrow.classList.remove('disabled');
			}
			if (i === imgThumb.length - 1) {
				//Disable arrow if last img is opened
				rightArrow.classList.add('disabled');
			} else {
				rightArrow.classList.remove('disabled');
			}
		}.bind(this, i));
	}
});
