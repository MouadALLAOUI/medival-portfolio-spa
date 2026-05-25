import { useRef, useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ArrowBigDown, Menu, X } from "lucide-react";
import { useSettings } from '../lib/useSettings';
import styles from './Headers.module.scss';

// --- Helper for Medieval Naming ---
const getMedievalLabel = (label) => {
	const labels = {
		'hero': 'Oracle',
		'presentation': 'The Craftsman',
		'skills': 'Scroll of Skills',
		'projects': 'Tech Quests',
		'about': 'Coding Lore',
		'contact': 'Send Raven',
		'hobbies': 'Beyond Code',
		'design': 'Design Forge'
	};
	return labels[label] || 'Tongues of the Realm';
};

// --- Extracted Components ---

const DesktopSubMenu = ({ items, isActive, closeMenu, styles }) => (
	<div className={styles['dropdown-menu']}>
		{items.map((subItem) => (
			<Link
				key={subItem.href}
				to={`/home${subItem.href}`}
				className={`${styles['nav-link']} ${isActive(subItem.href) ? styles.active : ''}`}
				onClick={closeMenu}
			>
				{getMedievalLabel(subItem.label)}
			</Link>
		))}
	</div>
);

const MobileMenu = ({ items, isActive, closeMenu, styles }) => (
	<>
		{items.map((item) => {
			if (item.isTrigger && item.subItems) {
				return item.subItems.map((subItem) => (
					<Link
						key={subItem.href}
						to={`/home${subItem.href}`}
						className={`${styles['nav-link']} ${isActive(subItem.href) ? styles.active : ''}`}
						onClick={closeMenu}
					>
						{getMedievalLabel(subItem.label)}
					</Link>
				));
			}

			return (
				<Link
					key={item.href}
					to={item.href}
					className={`${styles['nav-link']} ${item.label === 'Kids Typing Game' ? styles['nav-link-special'] : ''} ${isActive(item.href) ? styles.active : ''}`}
					onClick={closeMenu}
				>
					{item.label}
				</Link>
			);
		})}
	</>
);

// --- Main Component ---

const HeaderComponent = () => {
	const location = useLocation();
	const { openSettings } = useSettings();
	const [openMenu, setOpenMenu] = useState(null);
	const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
	const [isScrolled, setIsScrolled] = useState(false);
	const [activeSection, setActiveSection] = useState('');
	const timeoutRef = useRef(null);

	const menuItems = [
		{ label: 'ACCUEIL', href: '/', isTrigger: false },
		{
			label: 'HOME', href: '/home', isTrigger: true, subItems: [
				{ label: 'hero', href: '#hero' },
				{ label: 'presentation', href: '#presentation' },
				{ label: 'skills', href: '#skills' },
				{ label: 'projects', href: '#projects' },
				{ label: 'hobbies', href: '#hobbies' },
				{ label: 'design', href: '#design' },
				{ label: 'about', href: '#about' },
				{ label: 'contact', href: '#contact' },
			]
		},
		{ label: 'PROJETS', href: '/projects', isTrigger: false },
		{ label: 'My blogs', href: '/blogs', isTrigger: false },
		{ label: 'CRMEF Portfolio', href: '/CRMEF', isTrigger: false },
		{ label: 'Kids Typing Game', href: '/fallingletters', isTrigger: false },
	];

	const handleMouseEnter = (label) => {
		if (timeoutRef.current) clearTimeout(timeoutRef.current);
		setOpenMenu(label);
	};
	const handleMouseLeave = () => {
		timeoutRef.current = setTimeout(() => setOpenMenu(null), 150);
	};

	useEffect(() => {
		const bodyContainer = document.getElementById('body-container');
		if (!bodyContainer) return; // Safety check in case it hasn't rendered yet

		const onScroll = () => {
			// Use scrollTop instead of window.scrollY
			setIsScrolled(bodyContainer.scrollTop > 50);
		};

		bodyContainer.addEventListener('scroll', onScroll);
		onScroll(); // Fire once on mount

		return () => bodyContainer.removeEventListener('scroll', onScroll);
	}, []);

	useEffect(() => {
		const bodyContainer = document.getElementById('body-container');
		if (!bodyContainer) return;

		const handleScroll = () => {
			const sectionIds = ['hero', 'presentation', 'languages', 'skills', 'projects', 'learning', 'hobbies', 'design', 'about', 'contact'];
			let current = '';

			for (const sectionId of sectionIds) {
				const el = document.getElementById(sectionId);
				if (el) {
					// getBoundingClientRect() still works because it measures relative to the viewport
					const rect = el.getBoundingClientRect();
					if (rect.top <= window.innerHeight * 0.4) {
						current = sectionId;
					}
				}
			}
			setActiveSection(current);
		};

		bodyContainer.addEventListener('scroll', handleScroll);
		handleScroll(); // Fire once on mount

		return () => bodyContainer.removeEventListener('scroll', handleScroll);
	}, []);

	useEffect(() => {
		if (!location.hash) return;
		const id = location.hash.replace('#', '');
		const element = document.getElementById(id);
		if (element) {
			element.scrollIntoView({ behavior: 'smooth', block: 'start' });
		}
	}, [location.hash]);

	const isActive = (href) => {
		if (href.startsWith('#')) {
			const sectionId = href.replace('#', '');
			return activeSection === sectionId;
		}
		if (href === '/') return location.pathname === '/' || location.pathname === '/home';
		return location.pathname === href;
	};

	const closeMobileMenu = () => setIsMobileMenuOpen(false);

	return (
		<nav
			className={`${styles['nav-container']} ${isScrolled ? styles['nav-scrolled'] : ''} ${isMobileMenuOpen ? `${styles.active} ${styles['mobile-menu-active']}` : ''}`}
			id="nav-container"
		>
			<div className={styles['nav-title']}>
				<img src="/assets/favicon.ico" alt="logo" />
				<p>Mouad the Coder</p>
			</div>

			<div className={styles['nav-scroll']}>

				{/* DESKTOP NAV */}
				<div className={`${styles['nav-links']} ${styles['desktop-menu']}`}>
					{menuItems.map((item) => {
						if (item.isTrigger && item.subItems) {
							return (
								<div
									key={item.label}
									className={styles['dropdown-wrapper']}
									onMouseEnter={() => handleMouseEnter(item.label)}
									onMouseLeave={handleMouseLeave}
								>
									<Link
										to={item.href}
										className={`${styles['nav-link']} ${styles['nav-link-trigger']} ${isActive(item.href) ? styles.active : ''}`}
										onClick={closeMobileMenu}
									>
										{item.label}
										<ArrowBigDown size={16} />
									</Link>

									{openMenu === item.label && (
										<DesktopSubMenu
											items={item.subItems}
											isActive={isActive}
											closeMenu={() => {
												closeMobileMenu();
												setOpenMenu(null);
											}}
											styles={styles}
										/>
									)}
								</div>
							);
						}

						return (
							<Link
								key={item.href}
								to={item.href}
								className={`${styles['nav-link']} ${item.label === 'Kids Typing Game' ? styles['nav-link-special'] : ''} ${isActive(item.href) ? styles.active : ''}`}
								onClick={closeMobileMenu}
							>
								{item.label}
							</Link>
						);
					})}
				</div>
				{/* MOBILE NAV */}

				<div className={`${styles['nav-links']} ${styles['mobile-menu']}`}>
					<MobileMenu
						items={menuItems}
						isActive={isActive}
						closeMenu={closeMobileMenu}
						styles={styles}
					/>
				</div>

			</div>

			<div className={styles['nav-actions']}>
				<button
					className={styles['nav-gear-btn']}
					type="button"
					aria-label="Open settings"
					onClick={openSettings}
				>
					⚙
				</button>
			</div>

			<div className={styles['nav-toggle']}>
				<button className={styles['mobile-menu-btn']} type="button" onClick={() => setIsMobileMenuOpen((prev) => !prev)}>
					{isMobileMenuOpen ? <X size={20} color="var(--color-gold)" /> : <Menu size={20} color="var(--color-gold)" />}
				</button>
			</div>
		</nav>
	);
};

export default HeaderComponent;