document.getElementById('app').innerHTML = `
	<div id="cursor-i">i</div>

	<div class="floating-logo">
		<a href="./index.html">
			<img src="./lime-logo-nobg.png" alt="LiME" onerror="this.style.display='none'; this.parentElement.innerText='LiME';" />
		</a>
	</div>

	<nav class="right-nav-dock">
		<ul>
			<li><a href="./index.html" class="nav-item active">Info</a></li>
			<li><a href="https://limenetwork.dev/join" class="nav-item">Join</a></li>
			<li><a href="https://limenetwork.dev/join#rules" class="nav-item">Rules</a></li>
			<li><a href="https://limenetwork.dev/browser" class="nav-item">Browser</a></li>
			<li><a href="https://limenetwork.dev/staff" class="nav-item">Staff</a></li>
			<li><a href="#" class="nav-item">Feedback</a></li>
		</ul>
	</nav>

	<section class="hero-section">
		<div class="lime-container">
			<div class="news-wrapper">
				<div class="news-scroll-box" id="lime-news-feed"></div>
				<div class="news-scroll-hint">↓ Scroll inside news for previous updates ↓</div>
			</div>

			<div class="status-widget">
				<span class="status-content">
					<span id="status-icon" class="status-pulse">⟳</span>
					<span id="status-text">Pinging server...</span>
				</span>
			</div>

			<p class="lime-desc">
				LiME is a chill crossplay survival server where you can just hang out and meet cool people.<br><br>
				Whether you're on Java, Bedrock, or playing in full VR — everyone is in the same world.<br><br>
				Build cities together, work jobs, run shops, or just relax and talk with friends.
			</p>

			<button class="btn-join" onclick="window.location.href='https://limenetwork.dev/join'">
				<span class="btn-join-text">Join LiME</span>
			</button>

			<button class="btn-calendar" onclick="window.location.href='./calendar.html'">
				<span>Calendar</span>
			</button>
		</div>
	</section>

	<section class="features-section">
		<div class="features-card">
			<h2 class="features-title"><strong>Key Features</strong></h2>
			<ul class="features-list">
				<li>True Crossplay — Java, Bedrock in the same world</li>
				<li>Full VR Support — Native Vivecraft (including QuestCraft)</li>
				<li>Player-Built Cities — Neighborhoods, apartments, shops, skyscrapers</li>
				<li>Real Economy &amp; Jobs — Work, earn money, run shops, buy land</li>
			</ul>
		</div>
	</section>

	<footer class="site-footer">
		NOT AN OFFICIAL MINECRAFT PRODUCT. NOT APPROVED BY OR ASSOCIATED WITH MOJANG OR MICROSOFT
	</footer>
`;

const LIME_NEWS = [
	{ badge: "Current News", title: "New website!", body: "Our brand new website is officially live!" },
	{ badge: "Previous Update", title: "Server maintenance over", body: "Fixed and back open! Thank you Savage!" }
];

function renderNews(items) {
	const feed = document.getElementById('lime-news-feed');
	if (!feed) return;
	feed.innerHTML = items.map((item, idx) => `
		<div class="news-item">
			<div class="news-badge">${item.badge || (idx === 0 ? 'Current News' : 'Previous News')}</div>
			<h2 class="news-title">${item.title}</h2>
			<p class="news-body">${item.body}</p>
		</div>
	`).join('');
}
renderNews(LIME_NEWS);

const cursor = document.getElementById('cursor-i');
document.addEventListener('mousemove', (e) => {
	if (!cursor) return;
	cursor.style.left = e.clientX + 'px';
	cursor.style.top  = e.clientY + 'px';
});

(function() {
	const ip = "thelimenetwork.minecraft.best";
	fetch("https://api.mcsrvstat.us/2/" + ip)
		.then(res => res.json())
		.then(data => {
			const icon = document.getElementById('status-icon');
			const text = document.getElementById('status-text');
			if (!icon || !text) return;
			icon.classList.remove('status-pulse');
			if (data.online) {
				icon.innerHTML = '●';
				icon.style.color = '#39ff14';
				text.innerHTML = `ONLINE <span class="status-divider">|</span> <span class="status-highlight">${data.players.online}</span> / ${data.players.max} Players`;
			} else {
				icon.innerHTML = '●';
				icon.style.color = '#ff3b3b';
				text.innerHTML = `OFFLINE`;
			}
		})
		.catch(() => {});
})();