// CV Template Chooser Application

class TemplateChooser {
    constructor() {
        this.currentTab = 'popular';
        this.currentTemplate = null;
        this.currentColor = COLORS_DATA[5].mainColor; // Default: Smalt Blue
        this.templateCache = {};

        this.init();
    }

    init() {
        this.bindEvents();
        this.loadTemplates('popular');
        this.initColorPalette();
    }

    bindEvents() {
        // Tab buttons
        document.querySelectorAll('.tab-btn').forEach(btn => {
            btn.addEventListener('click', (e) => this.handleTabClick(e));
        });

        // Modal close button
        document.querySelector('.modal-close').addEventListener('click', () => this.closeModal());

        // Modal overlay click
        document.getElementById('previewModal').addEventListener('click', (e) => {
            if (e.target.id === 'previewModal') {
                this.closeModal();
            }
        });

        // Escape key to close modal
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                this.closeModal();
            }
        });

        // Use template button
        document.querySelector('.btn-use-template').addEventListener('click', () => {
            if (this.currentTemplate) {
                alert(`Template "${this.currentTemplate.displayName}" selected!`);
            }
        });
    }

    handleTabClick(e) {
        const tab = e.target.dataset.tab;
        if (tab === this.currentTab) return;

        // Update active tab
        document.querySelectorAll('.tab-btn').forEach(btn => {
            btn.classList.remove('active');
            btn.setAttribute('aria-selected', 'false');
        });
        e.target.classList.add('active');
        e.target.setAttribute('aria-selected', 'true');

        this.currentTab = tab;
        // Clear cache when switching tabs to ensure fresh load
        this.templateCache = {};
        this.loadTemplates(tab);
    }

    async loadTemplates(tab) {
        const grid = document.getElementById('templatesGrid');
        grid.innerHTML = '<div class="loading">Loading templates...</div>';

        const templates = tab === 'popular' ? POPULAR_TEMPLATES : TEMPLATES_DATA;

        grid.innerHTML = '';

        for (let i = 0; i < templates.length; i++) {
            const template = templates[i];
            const card = await this.createTemplateCard(template);
            grid.appendChild(card);
        }
    }

    async createTemplateCard(template) {
        const wrapper = document.createElement('div');
        wrapper.className = 'card-wrap js-thumbnail-animation slide-in';
        wrapper.dataset.skinName = template.skinName;

        // Load template HTML for thumbnail
        const templateHTML = await this.fetchTemplateHTML(template.skinName);

        wrapper.innerHTML = `
            <div class="skins-card-container" data-skin="${template.skinName}">
                <div class="card js-thumbnail-index modal-preview-user-select-state" data-index="${template.index}" data-skin-category="${template.category}">
                    <div class="svg-skin template-thumbnail">
                        ${templateHTML}
                    </div>
                    <div class="preview-overlay">
                        <button class="btn-preview" data-skin="${template.skinName}">Preview template</button>
                    </div>
                    <div class="template-name-badge">${template.displayName}</div>
                </div>
            </div>
        `;

        // Store template reference on the element
        const container = wrapper.querySelector('.skins-card-container');
        container._templateData = template;

        // Add click event for preview button
        const previewBtn = wrapper.querySelector('.btn-preview');
        previewBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            const skinName = e.target.dataset.skin;
            const tmpl = TEMPLATES_DATA.find(t => t.skinName === skinName) ||
                         POPULAR_TEMPLATES.find(t => t.skinName === skinName);
            if (tmpl) {
                this.openPreview(tmpl);
            }
        });

        // Add click event for card
        container.addEventListener('click', (e) => {
            const tmpl = e.currentTarget._templateData;
            if (tmpl) {
                this.openPreview(tmpl);
            }
        });

        return wrapper;
    }

    async fetchTemplateHTML(skinName) {
        // Always fetch fresh - don't use cache for now to debug
        try {
            const response = await fetch(`templates/${skinName}.html?t=${Date.now()}`);
            if (response.ok) {
                const html = await response.text();
                // Parse the HTML and extract the inner content
                const parser = new DOMParser();
                const doc = parser.parseFromString(html, 'text/html');

                // Get the svg-skin content (the actual template)
                const svgSkin = doc.querySelector('.svg-skin');
                if (svgSkin) {
                    return svgSkin.innerHTML;
                }
                return html;
            }
        } catch (e) {
            console.error(`Failed to load template ${skinName}:`, e);
        }
        return `<div class="template-placeholder">Template: ${skinName}</div>`;
    }

    initColorPalette() {
        const palette = document.getElementById('colorPalette');
        palette.innerHTML = '';

        COLORS_DATA.forEach((group, groupIndex) => {
            const groupDiv = document.createElement('div');
            groupDiv.className = 'color-group';

            // Main color
            const mainDiv = document.createElement('div');
            mainDiv.className = 'color-group-main';

            const mainColor = document.createElement('div');
            mainColor.className = 'color-option main-color';
            mainColor.style.backgroundColor = group.mainColor.color;
            mainColor.title = group.mainColor.label;
            mainColor.dataset.color = group.mainColor.color;
            mainColor.dataset.label = group.mainColor.label;
            mainColor.addEventListener('click', () => this.selectColor(group.mainColor));

            if (group.mainColor.color === this.currentColor.color) {
                mainColor.classList.add('active');
            }

            mainDiv.appendChild(mainColor);
            groupDiv.appendChild(mainDiv);

            // Sub colors
            const subDiv = document.createElement('div');
            subDiv.className = 'sub-colors';

            group.subColors.forEach(subColor => {
                const colorEl = document.createElement('div');
                colorEl.className = 'color-option sub-color';
                colorEl.style.backgroundColor = subColor.color;
                colorEl.title = subColor.label;
                colorEl.dataset.color = subColor.color;
                colorEl.dataset.label = subColor.label;
                colorEl.addEventListener('click', () => this.selectColor(subColor));
                subDiv.appendChild(colorEl);
            });

            groupDiv.appendChild(subDiv);
            palette.appendChild(groupDiv);
        });
    }

    selectColor(color) {
        this.currentColor = color;

        // Update active state
        document.querySelectorAll('.color-option').forEach(el => {
            el.classList.remove('active');
            if (el.dataset.color === color.color) {
                el.classList.add('active');
            }
        });

        // Update preview colors
        this.updatePreviewColor(color);
    }

    updatePreviewColor(color) {
        const previewContainer = document.getElementById('previewContainer');
        if (!previewContainer.innerHTML || !this.currentTemplate) return;

        // Update left-box background color
        const leftBoxes = previewContainer.querySelectorAll('.left-box');
        leftBoxes.forEach(leftBox => {
            leftBox.style.backgroundColor = color.color;
        });

        // Update name color
        const names = previewContainer.querySelectorAll('.name');
        names.forEach(name => {
            name.style.color = color.color;
        });

        // Update rating bars
        previewContainer.querySelectorAll('.inner-rating').forEach(el => {
            el.style.backgroundColor = color.color;
        });

        previewContainer.querySelectorAll('.ratvfill').forEach(el => {
            el.style.backgroundColor = color.color;
        });

        // Update section borders
        previewContainer.querySelectorAll('.right-box .section:first-child').forEach(el => {
            el.style.borderBottomColor = color.color;
        });

        // Update total experience badge
        previewContainer.querySelectorAll('.totl-expr').forEach(el => {
            el.style.backgroundColor = color.color;
        });
    }

    async openPreview(template) {
        console.log('Opening preview for:', template.skinName, template.displayName);

        this.currentTemplate = template;

        // Update modal title
        document.getElementById('modalTemplateName').textContent = template.displayName;

        // Load preview content
        const previewContainer = document.getElementById('previewContainer');
        previewContainer.innerHTML = '<div class="loading">Loading preview...</div>';

        // Show modal immediately
        document.getElementById('previewModal').style.display = 'flex';
        document.body.style.overflow = 'hidden';

        try {
            // Fetch fresh template HTML (no cache)
            const templateHTML = await this.fetchTemplateHTML(template.skinName);

            console.log('Loaded template HTML for:', template.skinName, 'Length:', templateHTML.length);

            // Create preview wrapper
            previewContainer.innerHTML = `
                <div class="preview-wrapper">
                    <div class="svg-skin template-preview">
                        ${templateHTML}
                    </div>
                </div>
            `;

            // Apply current color after DOM update
            requestAnimationFrame(() => {
                this.updatePreviewColor(this.currentColor);
            });

        } catch (e) {
            console.error('Failed to load preview:', e);
            previewContainer.innerHTML = '<div class="error">Failed to load preview</div>';
        }
    }

    closeModal() {
        document.getElementById('previewModal').style.display = 'none';
        document.body.style.overflow = '';
        this.currentTemplate = null;
    }
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    window.templateChooser = new TemplateChooser();
});
