import { LightningElement, track, api } from 'lwc';
import getMyShifts from '@salesforce/apex/MyVolunteerShiftsController.getMyShifts';
import LightningAlert from 'lightning/alert';

export default class MyVolunteerShiftLWC extends LightningElement {
    @api title = '';
    @api fontSize = '16px';
    @api fontWeight = '600';
    @api fontColor = '#1c1c1c';
    @api fontFamily = 'Arial, sans-serif';
    @api floatAlign = '';
    @api tableHeaderfontSize = '16px';
    @api tableHeaderfontColor = '#1c1c1c';
    @api tableHeaderfontFamily = 'Arial, sans-serif';
    @api tableHeaderfontWeight;
    @api tableDatafontSize;
    @api tableDatafontColor;
    @api tableDatafontFamily;
    @api tableDatafontWeight;

    @api disableHeaderStyle;
    showSpinner;
    @api headingType;
    @api thHeadingType;
    @api tdHeadingType;

    // Pagination range
    start = 0;
    end = 5;

    // Maps shift Id to its index for quick lookup
    shiftIndexMap = {};

    @track shifts = [];

    connectedCallback() {
        this.getMyShifts();
    }

    getMyShifts() {
        this.showSpinner = true;
        getMyShifts()
            .then(result => {
                if (result && result.length > 0) {
                    this.shifts = result;
                    this.shiftIndexMap = {};
                    result.forEach((shift, index) => {
                        this.shiftIndexMap[shift.Id] = index;
                    });
                } else {
                    this.shifts = []; // Empties the list if no shifts exist
                }
            })
            .catch(error => {
                this.showToast('Error', 'Failed to load shifts', 'error');
                console.error('Error:', error);
            })
            .finally(() => {
                this.showSpinner = false;
            });
    }

    // Getter to hide the component if no shifts are returned
    get hasShifts() {
        return this.shifts && this.shifts.length > 0;
    }

    get visibleShifts() {
        return this.shifts.slice(this.start, this.end);
    }

    get showViewAll() {
        return this.shifts.length > 5 && this.end === 5;
    }

    get showViewLess() {
        return this.shifts.length > 5 && this.end !== 5;
    }

    viewAll() {
        this.end = this.shifts.length;
    }

    viewLess() {
        this.end = 5;
    }

    // Redirect to static URL
    handleRowClick() {
        const url = '/learning-about-us/frost-for-good-volunteers/manage-events';
        window.open(url, '_self');
    }

    get titleStyle() {
        if (!this.disableHeaderStyle) {
            const headingMap = {
                'Heading 1': 'text-heading-extra-large',
                'Heading 2': 'text-heading-large',
                'Heading 3': 'text-heading-medium',
                'Heading 4': 'text-heading-small',
                'Heading 5': 'text-heading-extra-small',
                'Heading 6': 'text-heading-extra-extra-small',
                'Paragraph 1': 'body-text',
                'Paragraph 2': 'body-small-text'
            };

            const tokenSuffix = headingMap[this.headingType];
            if (tokenSuffix) {
                return `
                font-size: var(--dxp-s-${tokenSuffix}-font-size);
                font-family: var(--dxp-s-${tokenSuffix}-font-family);
                color: var(--dxp-s-${tokenSuffix}-color);
                font-weight: var(--dxp-s-${tokenSuffix}-font-weight);
                text-align: ${this.floatAlign};
            `;
            }
        }
        return `
        font-size: ${this.fontSize};
        font-weight: ${this.fontWeight};
        color: ${this.fontColor};
        font-family: ${this.fontFamily};
        text-align: ${this.floatAlign};
    `;
    }

    get linkStyle() {
        if (!this.disableHeaderStyle) {
            return `
                color: var(--dxp-s-link-text-color);
                font-weight: var(--dxp-s-link-text-font-weight);
                font-family: var(--dxp-s-link-text-font-family);
                font-size: var(--dxp-s-link-text-font-size);
                text-decoration: var(--dxp-s-link-text-decoration);
                cursor: pointer;
            `;
        }
        return `
            color: #0070d2;
            text-decoration: underline;
            cursor: pointer;
        `;
    }

    get headerStyle() {
        if (!this.disableHeaderStyle) {
            const headingMap = {
                'Heading 1': 'text-heading-extra-large',
                'Heading 2': 'text-heading-large',
                'Heading 3': 'text-heading-medium',
                'Heading 4': 'text-heading-small',
                'Heading 5': 'text-heading-extra-small',
                'Heading 6': 'text-heading-extra-extra-small',
                'Paragraph 1': 'body-text',
                'Paragraph 2': 'body-small-text'
            };

            const tokenSuffix = headingMap[this.thHeadingType];
            if (tokenSuffix) {
                return `
                font-size: var(--dxp-s-${tokenSuffix}-font-size);
                font-family: var(--dxp-s-${tokenSuffix}-font-family);
                color: var(--dxp-s-${tokenSuffix}-color);
                font-weight: var(--dxp-s-${tokenSuffix}-font-weight);
                text-align: ${this.floatAlign};
            `;
            }
        }
        return `
            font-size: ${this.tableHeaderfontSize};
            color: ${this.tableHeaderfontColor};
            font-family: ${this.tableHeaderfontFamily};
            font-weight: ${this.fontWeight};
        `;
    }

    get dataStyle() {
        if (!this.disableHeaderStyle) {
            const headingMap = {
                'Heading 1': 'text-heading-extra-large',
                'Heading 2': 'text-heading-large',
                'Heading 3': 'text-heading-medium',
                'Heading 4': 'text-heading-small',
                'Heading 5': 'text-heading-extra-small',
                'Heading 6': 'text-heading-extra-extra-small',
                'Paragraph 1': 'body-text',
                'Paragraph 2': 'body-small-text'
            };

            const tokenSuffix = headingMap[this.tdHeadingType];
            if (tokenSuffix) {
                return `
                font-size: var(--dxp-s-${tokenSuffix}-font-size);
                font-family: var(--dxp-s-${tokenSuffix}-font-family);
                color: var(--dxp-s-${tokenSuffix}-color);
                font-weight: var(--dxp-s-${tokenSuffix}-font-weight);
                text-align: ${this.floatAlign};
            `;
            }
        }
        return `
            font-size: ${this.tableDatafontSize};
            color: ${this.tableDatafontColor};
            font-family: ${this.tableDatafontFamily};
            font-weight: ${this.tableDatafontWeight};
        `;
    }

    showToast(msg, theme, label) {
        LightningAlert.open({ message: msg, theme: theme, label: label });
    }
}
