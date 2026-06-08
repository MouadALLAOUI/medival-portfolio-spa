import { getAssetById } from '../data/mediaManager';
import { useRef, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ArrowBigDown, Menu, X } from "lucide-react";
import { useSettings } from '../lib/useSettings';
import { useSound } from '../lib/hooks/useSound';
import useScrollSpy from '../hooks/useScrollSpy';
import NavActions from './NavActions';
import styles from './Headers.module.scss';

const getMedievalLabel = (label, t) => {
	const translationKey = `COMMON.nav.medieval.${label}`;
	const resolved = t(translationKey);
	return resolved !== translationKey ? resolved : 'Tongues of the Realm';
};

const DesktopSubMenu = ({ items, isActive, closeMenu, styles, t }) => (
	<div className={styles['dropdown-menu']}>
		{items.map((subItem) => {
			const isPdf = subItem.href.endsWith('.pdf');
			if (isPdf) {
				return (
					<a key={subItem.href} href={subItem.href} target="_blank" rel="noopener noreferrer" className={`${styles['nav-link']} ${isActive(subItem.href) ? styles.active : ''}`} onClick={closeMenu}>
						{getMedievalLabel(subItem.label, t)}
					</a>
				);
			}
			return (
				<Link key={subItem.href} to={`/home${subItem.href}`} className={`${styles['nav-link']} ${isActive(subItem.href) ? styles.active : ''}`} onClick={closeMenu}>
					{getMedievalLabel(subItem.label, t)}
				</Link>
			);
		})}
	</div>
);

const MobileMenu = ({ items, isActive, closeMenu, styles, t }) => (
	<>
		{items.map((item) => {
			if (item.isTrigger && item.subItems) {
				return item.subItems.map((subItem) => {
					const isPdf = subItem.href.endsWith('.pdf');
					if (isPdf) {
						return (
							<a key={subItem.href} href={subItem.href} target="_blank" rel="noopener noreferrer" className={`${styles['nav-link']} ${isActive(subItem.href) ? styles.active : ''}`} onClick={closeMenu}>
								{getMedievalLabel(subItem.label, t)}
							</a>
						);
					}
					return (
						<Link key={subItem.href} to={`/home${subItem.href}`} className={`${styles['nav-link']} ${isActive(subItem.href) ? styles.active : ''}`} onClick={closeMenu}>
							{getMedievalLabel(subItem.label, t)}
						</Link>
					);
				});
			}

			const isPdf = item.href.endsWith('.pdf');
			if (isPdf) {
				return (
					<a key={item.href} href={item.href} target="_blank" rel="noopener noreferrer" className={`${styles['nav-link']} ${item.href === '/fallingletters' ? styles['nav-link-special'] : ''} ${isActive(item.href) ? styles.active : ''}`} onClick={closeMenu}>
						{item.label}
					</a>
				);
			}

			if (item.href === '/fallingletters') {
				return (
					<a key={item.href} href={item.href} target="_blank" rel="noopener noreferrer" className={`${styles['nav-link']} ${styles['nav-link-special']} ${isActive(item.href) ? styles.active : ''}`} onClick={closeMenu}>
						{item.label}
					</a>
				);
			}

			return (
				<Link key={item.href} to={item.href} className={`${styles['nav-link']} ${item.href === '/fallingletters' ? styles['nav-link-special'] : ''} ${isActive(item.href) ? styles.active : ''}`} onClick={closeMenu}>
					{item.label}
				</Link>
			);
		})}
	</>
);

const SECTION_IDS = ['hero', 'presentation', 'languages', 'skills', 'projects', 'learning', 'hobbies', 'design', 'about', 'contact'];

const HeaderComponent = () => {
	const location = useLocation();
	const { t } = useSettings();
	const { play: playSound } = useSound();
	const { activeSection, isScrolled } = useScrollSpy(SECTION_IDS);
	const [openMenu, setOpenMenu] = useState(null);
	const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
	const timeoutRef = useRef(null);

	const menuItems = [
		{ label: t('COMMON.nav.home'), href: '/', isTrigger: false },
		{
			label: t('COMMON.nav.landing'), href: '/home', isTrigger: true, subItems: [
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
		{ label: t('COMMON.nav.projects'), href: '/projects', isTrigger: false },
		{ label: t('COMMON.nav.blogs'), href: '/blogs', isTrigger: false },
		{ label: t('COMMON.nav.crmef'), href: '/CRMEF', isTrigger: false },
		{ label: t('COMMON.nav.game'), href: '/fallingletters', isTrigger: false },
	];

	const handleMouseEnter = (label) => {
		if (timeoutRef.current) clearTimeout(timeoutRef.current);
		setOpenMenu(label);
		playSound('paper');
	};
	const handleMouseLeave = () => {
		timeoutRef.current = setTimeout(() => setOpenMenu(null), 150);
	};

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
				<img src={getAssetById('favicon').path} alt="logo" />
				<p>{t('COMMON.nav.logoText')}</p>
			</div>

			<div className={styles['nav-scroll']}>
				<div className={`${styles['nav-links']} ${styles['desktop-menu']}`}>
					{menuItems.map((item) => {
						if (item.isTrigger && item.subItems) {
							return (
								<div key={item.label} className={styles['dropdown-wrapper']} onMouseEnter={() => handleMouseEnter(item.label)} onMouseLeave={handleMouseLeave}>
									<Link to={item.href} className={`${styles['nav-link']} ${styles['nav-link-trigger']} ${isActive(item.href) ? styles.active : ''}`} onClick={closeMobileMenu}>
										{item.label}
										<ArrowBigDown size={16} />
									</Link>
									{openMenu === item.label && (
										<DesktopSubMenu items={item.subItems} isActive={isActive} closeMenu={() => { closeMobileMenu(); setOpenMenu(null); }} styles={styles} t={t} />
									)}
								</div>
							);
						}

						const isPdf = item.href.endsWith('.pdf');
						if (isPdf) {
							return (
								<a key={item.href} href={item.href} target="_blank" rel="noopener noreferrer" className={`${styles['nav-link']} ${item.href === '/fallingletters' ? styles['nav-link-special'] : ''} ${isActive(item.href) ? styles.active : ''}`} onClick={closeMobileMenu}>
									{item.label}
								</a>
							);
						}

						if (item.href === '/fallingletters') {
							return (
								<a key={item.href} href={item.href} target="_blank" rel="noopener noreferrer" className={`${styles['nav-link']} ${styles['nav-link-special']} ${isActive(item.href) ? styles.active : ''}`} onClick={closeMobileMenu}>
									{item.label}
								</a>
							);
						}

						return (
							<Link key={item.href} to={item.href} className={`${styles['nav-link']} ${item.href === '/fallingletters' ? styles['nav-link-special'] : ''} ${isActive(item.href) ? styles.active : ''}`} onClick={closeMobileMenu}>
								{item.label}
							</Link>
						);
					})}
				</div>

				<div className={`${styles['nav-links']} ${styles['mobile-menu']}`}>
					<MobileMenu items={menuItems} isActive={isActive} closeMenu={closeMobileMenu} styles={styles} t={t} />
				</div>
			</div>

			<NavActions />

			<div className={styles['nav-toggle']}>
				<button
					className={styles['mobile-menu-btn']}
					type="button"
					onClick={() => setIsMobileMenuOpen((prev) => !prev)}
					aria-label={isMobileMenuOpen ? t('COMMON.nav.closeMenu') || "Close navigation menu" : t('COMMON.nav.toggleMenu') || "Toggle navigation menu"}
				>
					{isMobileMenuOpen ? <X size={20} color="var(--color-gold)" /> : <Menu size={20} color="var(--color-gold)" />}
				</button>
			</div>
		</nav>
	);
};

export default HeaderComponent;
