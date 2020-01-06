class UnfiyHeight {
    constructor(container, item, logActive = false) {
        super("UnfiyHeight", logActive);

        this._container = container;
        this._item = item;
        this._resized = false;
        this._collector = [];

        this._findItems();
    }

    _findItems() {
        try {
            var containers, container, items, i;
            containers = document.querySelectorAll(this._container);
            if (containers.length > 0) {
                for (i = 0; i < containers.length; i++) {
                    container = containers[i];
                    items = container.querySelectorAll(this._item);

                    if (items.length > 1) {
                        this._collector[this._collector.length] = items;
                    }
                }
            }

        } catch (error) {
            console.error(error);
        }
    }

    _getItemHeight(item) {
        var height;
        height = parseFloat(getComputedStyle(item, null).height.replace("px", ""));
        return height;
    }

    _setItemHeight(item, height) {
        try {
            if (typeof height === "function") height = height();
            if (typeof height === "string") item.style.height = height;
            else item.style.height = height + "px";
        } catch (error) {
            console.error(error);
        }
    }

    _resetItemHeight(item) {
        try {
            this._setItemHeight(item, 'auto');
        } catch (error) {
            console.error(error);
        }
    }

    _isMobile() {
        return window.innerWidth < 768;
    }

    _reset() {
        try {
            var collector, items, item,
                i, j;

            if (!this._resized) {
                return;
            }

            collector = this._collector;

            for (i = 0; i < collector.length; i++) {
                items = collector[i];
                for (j = 0; j < items.length; j++) {
                    item = items[j];
                    this._resetItemHeight(item);
                }

                this._resized = false;
            }

        } catch (error) {
            console.error(error);
        }
    }

    resize() {
        try {
            var collector, items, item, height, maxHeight,
                i, j, k;

            if (this._collector.length == 0) {
                return;
            }

            if (this._isMobile()) {
                this._reset();
                return;
            }

            collector = this._collector;
            for (i = 0; i < collector.length; i++) {
                items = collector[i];

                height = 0;
                maxHeight = 0;

                for (k = 0; k < items.length; k++) {
                    item = items[k];
                    this._resetItemHeight(item);
                }

                for (j = 0; j < items.length; j++) {
                    item = items[j];
                    height = this._getItemHeight(item)
                    if (height > maxHeight) {
                        maxHeight = height;
                    }
                }

                for (k = 0; k < items.length; k++) {
                    item = items[k];
                    this._setItemHeight(item, maxHeight);
                }

                this._resized = true;
            }
        } catch (error) {
            console.error(error);
        }
    }
}

export default UnfiyHeight;
