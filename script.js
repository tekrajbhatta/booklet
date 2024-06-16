let books = document.querySelectorAll('.book');
for (let book of books) {
	let pages = book.getElementsByClassName('bookpage');
	let size = pages.length;
	for (let i = 0, page; page = pages[i]; ++i) {
		if (i % 2 === 0) page.style.zIndex = (size - i);
	}
	book.onclick = function(e) {
		if (e.target == e.currentTarget) { // unroll book in mobile mode
			e.target.classList.toggle('unrolled');
		} else {
			e.currentTarget.classList.remove('unrolled');
			let pagearray = [...e.target.parentElement.children];
			let pagenum = pagearray.indexOf(e.target);
			e.target.classList.remove('clickable');
			if (pagenum & 1) { // odd pages (flip back)
				e.target.classList.remove('flipped');
				e.target.previousElementSibling.classList.remove('flipped');
				e.target.nextElementSibling.classList.remove('clickable');
				if (pagenum > 1) {
					e.target.previousElementSibling.classList.add('clickable');				
					e.target.previousElementSibling.previousElementSibling.classList.add('clickable');
				} else {
					e.target.parentElement.classList.remove('opened');
				}
			} else if (pagenum === (pagearray.length-1)) { // last page (close book)
				for (let i = pagenum; i >= 0; --i) {
					pagearray[i].classList.remove('flipped');
				}
				e.target.parentElement.classList.remove('opened');					
			} else { // even pages (flip forward)
				if (pagenum === 0) { // first page (open book)
					e.target.parentElement.classList.add('opened');
				} else {
					e.target.previousElementSibling.classList.remove('clickable');
				}
				e.target.classList.add('flipped');
				e.target.nextElementSibling.classList.add('flipped');
				e.target.nextElementSibling.classList.add('clickable');				
				e.target.nextElementSibling.nextElementSibling.classList.add('clickable');
			}
		}
		e.stopPropagation();
	}
}