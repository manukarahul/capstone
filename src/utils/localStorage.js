
export function getLocalStorageItem(key) {
    try {
        const item = localStorage.getItem(key);
        return item ? JSON.parse(item) : null;
    } catch (e) {
        console.error(`Error getting or parsing local storage item "${key}":`, e);
        // Optionally, clear corrupted item if parsing fails to prevent future errors
        // localStorage.removeItem(key);
        return null;
    }
}

export function setLocalStorageItem(key, value) {
    try {
        localStorage.setItem(key, JSON.stringify(value));
        return true;
    } catch (e) {
        console.error(`Error setting local storage item "${key}":`, e);
        return false;
    }
}


export function removeLocalStorageItem(key) {
    try {
        localStorage.removeItem(key);
    } catch (e) {
        console.error(`Error removing local storage item "${key}":`, e);
    }
}


// export function clearAllLocalStorage() {
//     try {
//         localStorage.clear();
//         console.log('All local storage data cleared.');
//     } catch (e) {
//         console.error('Error clearing all local storage:', e);
//     }
// }