const modalDetailsData = {
    catcalling: {
        title: "Catcalling & Street Harassment Penalties (RA 11313)",
        content: `
            <p style="font-size:0.9rem; margin-bottom:1rem; color:#475569;">
                Under <strong>Section 11 of Republic Act 11313</strong>, street and public space harassment carries progressive penalties depending on the frequency of offense:
            </p>
            <ul style="font-size:0.85rem; color:#334155; line-height:1.7; margin-left:1.2rem; margin-bottom:1.5rem;">
                <li><strong>1st Offense:</strong> Fine of ₱1,000 and mandatory community service of 12 hours, with mandatory gender sensitivity seminar.</li>
                <li><strong>2nd Offense:</strong> Arresto menor (6 to 10 days) or fine of ₱3,000.</li>
                <li><strong>3rd Offense:</strong> Arresto menor in its maximum period (11 to 30 days) and fine of ₱10,000.</li>
            </ul>
            <div style="background:#FEF2F2; padding:1rem; border-radius:6px; font-size:0.8rem; color:#991B1B;">
                <i class="fa-solid fa-triangle-exclamation"></i> <strong>Note:</strong> If committed in public utility vehicles (PUVs), the Land Transportation Franchising and Regulatory Board (LTFRB) may suspend or revoke the driver's license or franchise.
            </div>
        `
    },
    quidproquo: {
        title: "Workplace & Quid Pro Quo Harassment (RA 7877)",
        content: `
            <p style="font-size:0.9rem; margin-bottom:1rem; color:#475569;">
                Under <strong>RA 7877 Section 7</strong> and <strong>RA 11313 Section 16</strong>:
            </p>
            <ul style="font-size:0.85rem; color:#334155; line-height:1.7; margin-left:1.2rem; margin-bottom:1.5rem;">
                <li>Imprisonment of not less than 1 month nor more than 6 months.</li>
                <li>Fine of not less than ₱10,000 nor more than ₱20,000, or both at the discretion of the court.</li>
                <li>Administrative sanctions up to immediate dismissal from service and forfeiture of retirement benefits for public officers.</li>
            </ul>
        `
    },
    online: {
        title: "Online Gender-Based Violence (RA 11313 Sec 12)",
        content: `
            <p style="font-size:0.9rem; margin-bottom:1rem; color:#475569;">
                Online sexual harassment carries severe criminal penalties:
            </p>
            <ul style="font-size:0.85rem; color:#334155; line-height:1.7; margin-left:1.2rem; margin-bottom:1.5rem;">
                <li>Penalty of <em>Prision correccional</em> in its medium period or a fine of not less than ₱100,000 but not exceeding ₱500,000.</li>
                <li>If the perpetrator is an alien, deportation after serving sentence.</li>
                <li>Mandatory removal of degrading online material by social media platforms upon court order.</li>
            </ul>
        `
    },
    discrimination: {
        title: "Employment Discrimination (RA 9710 Magna Carta)",
        content: `
            <p style="font-size:0.9rem; margin-bottom:1rem; color:#475569;">
                Violations under Section 13 & 35 of RA 9710 carry administrative liability, damages under the Civil Code, and revocation of business operating permits for non-compliant establishments.
            </p>
        `
    },
    stalking: {
        title: "Physical Stalking & Unwanted Contact (RA 11313 Sec 11)",
        content: `
            <p style="font-size:0.9rem; margin-bottom:1rem; color:#475569;">
                Stalking accompanied by unwanted touching (groping, rubbing):
            </p>
            <ul style="font-size:0.85rem; color:#334155; line-height:1.7; margin-left:1.2rem; margin-bottom:1.5rem;">
                <li><strong>1st Offense:</strong> Fine of ₱30,000 and arresto menor (11 to 30 days).</li>
                <li><strong>2nd Offense:</strong> Fine of ₱50,000 and arresto mayor (1 month and 1 day to 6 months).</li>
                <li><strong>3rd Offense:</strong> Fine of ₱100,000 and arresto mayor in its maximum period.</li>
            </ul>
        `
    },
    academic: {
        title: "Academic Misconduct & Campus Provisions",
        content: `
            <p style="font-size:0.9rem; margin-bottom:1rem; color:#475569;">
                Schools and colleges failing to establish an operational CODI or investigate reported cases face revocation of institutional accreditation from DepEd, CHED, or TESDA.
            </p>
        `
    }
};

const mobileToggle = document.getElementById('mobileToggle');
const navMenu = document.getElementById('navMenu');

if (mobileToggle && navMenu) {
    mobileToggle.addEventListener('click', () => {
        navMenu.classList.toggle('mobile-open');
    });
}

navMenu?.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', (event) => {
        navMenu?.classList.remove('mobile-open');

        const target = document.querySelector(link.getAttribute('href'));
        if (!target) return;

        event.preventDefault();
        if (window.location.hash !== link.hash) {
            window.history.pushState(null, '', link.hash);
        }

        if (link.classList.contains('nav-link')) {
            document.querySelectorAll('.nav-link').forEach(navLink => navLink.classList.remove('active'));
            link.classList.add('active');
        }

        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
});

window.addEventListener('popstate', () => {
    const target = document.querySelector(window.location.hash || '#overview');
    target?.scrollIntoView({ behavior: 'smooth', block: 'start' });
});

const tabBtns = document.querySelectorAll('.tab-btn');
const crimeCards = document.querySelectorAll('.crime-card');

tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        tabBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        const filter = btn.getAttribute('data-filter');

        crimeCards.forEach(card => {
            const category = card.getAttribute('data-category');
            if (filter === 'all' || filter === category) {
                card.style.display = 'flex';
            } else {
                card.style.display = 'none';
            }
        });
    });
});

const searchInput = document.getElementById('crimeSearch');
if (searchInput) {
    searchInput.addEventListener('input', (e) => {
        const query = e.target.value.toLowerCase();

        crimeCards.forEach(card => {
            const text = card.innerText.toLowerCase();
            if (text.includes(query)) {
                card.style.display = 'flex';
            } else {
                card.style.display = 'none';
            }
        });
    });
}

const counters = document.querySelectorAll('.counter');
let counterAnimated = false;

function animateCounters() {
    counters.forEach(counter => {
        const target = Number(counter.getAttribute('data-target'));
        let current = 0;
        const increment = target / 30;

        const updateCount = () => {
            current += increment;
            if (current < target) {
                counter.innerText = Math.ceil(current);
                setTimeout(updateCount, 40);
            } else {
                counter.innerText = target;
            }
        };
        updateCount();
    });
}

const statsSection = document.getElementById('statistics');
if (statsSection) {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !counterAnimated) {
                animateCounters();
                counterAnimated = true;
            }
        });
    }, { threshold: 0.3 });

    observer.observe(statsSection);
}

function openModal(type) {
    const data = modalDetailsData[type];
    if (data) {
        document.getElementById('modalTitle').innerText = data.title;
        document.getElementById('modalBody').innerHTML = data.content;
        document.getElementById('detailModal').classList.add('open');
    }
}

function closeModal() {
    document.getElementById('detailModal').classList.remove('open');
}

const detailModal = document.getElementById('detailModal');
if (detailModal) {
    detailModal.addEventListener('click', (e) => {
        if (e.target.id === 'detailModal') {
            closeModal();
        }
    });
}


