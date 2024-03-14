function customCheckbox(el, keys) {
    const itensElArr = [...el.children];

    itensElArr.forEach((itemEl) => {
        itemEl.addEventListener('click', () => {
            if (itemEl.hasAttribute('checked')) itemEl.removeAttribute('checked');
            else itemEl.setAttribute('checked', 'checked');
        });
    });

    const getStates = () => {
        return keys
            .reduce((obj, currKey, index) => ({ ...obj, [currKey]: Boolean(itensElArr[index].getAttribute('checked')) }), {});
    };

    return getStates;
}

export default customCheckbox;
