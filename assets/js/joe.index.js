console.time("Index.js执行时长")
document.addEventListener('DOMContentLoaded', () => {
	/* 激活轮播图功能 */
	{
		if ($('.joe_index__banner .swiper-container').length !== 0) {
			let direction = 'horizontal'
			if (!Joe.IS_MOBILE && $('.joe_index__banner-recommend .item').length === 2) direction = 'vertical'
			new Swiper('.swiper-container', { keyboard: true, direction, loop: true, autoplay: true, mousewheel: true, pagination: { el: '.swiper-pagination' } })
		}
	}

	/* 初始化首页列表功能 */
	{
		let queryData = { page: 1, pageSize: 10, type: 'created' }
		const initDom = () => {
			$('.joe_index__list .joe_list').html('')
			let activeItem = $('.joe_index__title-title .item[data-type="' + queryData.type + '"]')
			let activeLine = $('.joe_index__title-title .line')
			activeItem.addClass('active').siblings().removeClass('active')
			activeLine.css({ left: activeItem.position().left, width: activeItem.width() })
		}
		const pushDom = () => {
			return new Promise((reslove, reject) => {
				$('.joe_load').attr('loading', true)
				$('.joe_load').html('加载中')
				$('.joe_index__list .joe_list__loading').show()
				$.ajax({
					url: Joe.BASE_API,
					type: 'POST',
					data: { routeType: 'publish_list', page: queryData.page, pageSize: queryData.pageSize, type: queryData.type },
					success(res) {
						if (res.data.length === 0) {
							$('.joe_load').remove()
							$('.joe_index__list .joe_list__loading').hide()
							return
						}
						res.data.forEach(_ => {
							$('.joe_index__list .joe_list').append(`
                                <li class="joe_list__item wow">
                                    <div class="line"></div>
                                    <a href="${_.permalink}" class="thumbnail" title="${_.title}">
                                        <img onerror="javascript: this.src='${_.lazyload}';" class="list_lazyload" src="${_.lazyload}" data-original="${_.image}" alt="${_.title}" />
                                        <time datetime="${_.time}">${_.time}</time>
                                        <svg viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" width="20" height="20">
                                            <path d="M903.93077753 107.30625876H115.78633587C64.57261118 107.30625876 22.58166006 149.81138495 22.58166006 201.02510964v624.26547214c0 51.7240923 41.99095114 93.71694641 93.71694641 93.7169464h788.14444164c51.7202834 0 93.71694641-41.99285557 93.71694642-93.7169464v-624.26547214c-0.51227057-51.21372469-43.01739676-93.71885088-94.229217-93.71885088zM115.78633587 171.8333054h788.65671224c16.385041 0 29.70407483 13.31522639 29.70407484 29.70407482v390.22828696l-173.60830179-189.48107072c-12.80486025-13.82749697-30.21634542-21.50774542-48.14010264-19.97093513-17.92375723 1.02073227-34.82106734 10.75387344-46.60138495 26.11437327l-172.58185762 239.1598896-87.06123767-85.52061846c-12.28878076-11.78222353-27.65308802-17.92375723-44.03812902-17.92375577-16.3907529 0.50846167-31.75506163 7.67644101-43.52966736 20.48129978L86.59453164 821.70468765V202.04965083c-1.02454117-17.41529409 12.80486025-30.73052046 29.19180423-30.21634543zM903.93077753 855.50692718H141.90642105l222.25496164-245.81940722 87.0593347 86.03669649c12.80105134 12.80676323 30.21253651 18.95020139 47.11555999 17.4172 17.40958218-1.53871621 33.79652618-11.26614404 45.06267018-26.11818071l172.58376063-238.64762047 216.11152349 236.08817198 2.05098681-1.54062067v142.87778132c0.50846167 16.3907529-13.31522639 29.70597929-30.21444096 29.70597928z m0 0" p-id="1916"></path>
                                            <path d="M318.07226687 509.82713538c79.88945091 0 144.41649754-65.03741277 144.41649754-144.41649753 0-79.37718032-64.52704663-144.92495923-144.41649754-144.92495922-79.89135536 0-144.41649754 64.52704663-144.41649756 144.41268862 0 79.89135536 64.52514218 144.92876814 144.41649756 144.92876813z m0-225.3266807c44.55230407 0 80.91208763 36.36168802 80.91208762 80.91018317 0 44.55611297-35.84751297 81.43007159-80.91208762 81.43007012-45.06838356 0-80.91589654-36.35978356-80.91589508-80.91589507 0-44.55611297 36.87205415-81.42435823 80.91589508-81.42435822z m0 0" p-id="1917"></path>
                                        </svg>
                                    </a>
                                    <div class="information">
                                        <a href="${_.permalink}" class="title" title="${_.title}">
                                            <h6>${_.title}</h6>
                                        </a>
                                        <a class="abstract" href="${_.permalink}" title="文章摘要">${_.abstract}</a>
                                        <div class="meta">
                                            <ul class="items">
                                                <li>${_.created}</li>
                                                <li>${_.views} 阅读</li>
                                                <li>${_.commentsNum} 评论</li>
                                                <li>${_.agree} 点赞</li>
                                            </ul>
                                            <div class="last" style="display: ${_.category.length ? 'flex' : 'none'}">
                                                <svg class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" width="15" height="15">
                                                    <path d="M512.200568 564.743248a76.81755 76.81755 0 0 1-30.973432-6.508227L108.22384 393.876696c-26.104541-11.508102-42.559305-35.754319-42.926671-63.272046-0.38374-27.439956 15.355733-52.052516 41.041741-64.231907L479.343229 89.632413c20.590967-9.736758 45.159526-9.754155 65.750493 0.017396l372.585787 176.739307c25.668613 12.1886 41.390689 36.792974 41.024346 64.231907-0.38374 27.500331-16.821107 51.729152-42.908252 63.237253L543.226189 558.235021a77.180823 77.180823 0 0 1-31.025621 6.508227zM139.841955 329.591577l370.21274 163.241898c1.291412 0.558725 3.018753 0.566912 4.344958-0.00921l369.758392-163.128311-369.706203-175.464267v-0.00921c-1.326205-0.62831-3.157923-0.636496-4.501524 0L139.841955 329.591577z m748.015342 1.858324h0.174985-0.174985zM512.375553 941.673993c-10.347672 0-20.799722-2.320858-30.53648-6.997368L121.048937 778.624477c-18.11252-7.834432-26.453489-28.870538-18.619056-46.983058 7.834432-18.11252 28.861328-26.488281 46.992267-18.609846L511.502673 869.659843l345.259418-156.366304c17.938558-8.165983 39.139415-0.252757 47.323819 17.746176 8.165983 17.96414 0.227174 39.156812-17.72878 47.323819L541.847795 934.973384c-9.196453 4.449335-19.282159 6.700609-29.472242 6.700609z" fill="#444444" p-id="37980"></path><path d="M871.563192 515.448542l-359.753527 156.326395-359.451652-155.987681v73.577763c0 13.701047 8.165983 26.084075 20.759813 31.479968L474.636021 750.035348c11.805884 5.702885 24.498974 8.54563 37.174667 8.54563s25.367761-2.842745 37.174668-8.54563l301.834396-129.501446a34.248012 34.248012 0 0 0 20.744463-31.473829v-73.611531z" fill="#ff6a18" p-id="37981"></path>
                                                </svg>
                                                <a class="link" rel="nofollow" href="${_.category.length && _.category[0].permalink}">${_.category.length && _.category[0].name}</a>
                                            </div>
                                        </div>
                                    </div>
                                </li>
                            `)
						})
						$('.joe_load').removeAttr('loading')
						$('.joe_load').html('查看更多')
						$('.joe_index__list .joe_list__loading').hide()
						new LazyLoad('.list_lazyload')
						reslove(res.data.length > 0 ? res.data.length - 1 : 0)
					}
				})
			})
		}
		initDom()
		pushDom()
		$('.joe_index__title-title .item').on('click', async function () {
			if ($(this).attr('data-type') === queryData.type) return
			queryData = { page: 1, pageSize: 10, type: $(this).attr('data-type') }
			initDom()
			pushDom()
		})
		$('.joe_load').on('click', async function () {
			if ($(this).attr('loading')) return
			queryData.page++
			let length = await pushDom()
			length = $('.joe_index__list .joe_list .joe_list__item').length - length
			const queryElement = `.joe_index__list .joe_list .joe_list__item:nth-child(${length})`
			const offset = $(queryElement).offset().top - $('.joe_header').height()
			window.scrollTo({ top: offset - 15, behavior: 'smooth' })
		})
	}

	/* 激活列表特效 */
	{
		const wow = $('.joe_index__list').attr('data-wow')
		if (wow !== 'off' && wow) new WOW({ boxClass: 'wow', animateClass: `animated ${wow}`, offset: 0, mobile: true, live: true, scrollContainer: null }).init()
	}

	console.timeEnd("Index.js执行时长")
})