document.addEventListener('DOMContentLoaded', () => {
    const checkboxes = document.querySelectorAll('.check-input');
    const resetButton = document.getElementById('reset-btn');

    // Firebaseの準備ができるまで少し待ってから同期処理を開始する
    const checkFirebaseReady = setInterval(() => {
        if (window.db) {
            clearInterval(checkFirebaseReady);
            initSync();
        }
    }, 100);

    function initSync() {
        const { db, dbRef, dbSet, dbOnValue } = window;
        const checklistRef = dbRef(db, 'checklist');

        // --------------------------------------------------
        // 1. リアルタイム受信：誰かがチェックを変えたら即画面に反映
        // --------------------------------------------------
        dbOnValue(checklistRef, (snapshot) => {
            const data = snapshot.val() || {};
            checkboxes.forEach((checkbox) => {
                // データベースの値（true / false）を各要素に反映
                checkbox.checked = !!data[checkbox.id];
            });
        });

        // --------------------------------------------------
        // 2. チェック操作時：データベースへ保存（家族全員の画面に飛ぶ）
        // --------------------------------------------------
        checkboxes.forEach((checkbox) => {
            checkbox.addEventListener('change', (e) => {
                const itemRef = dbRef(db, `checklist/${e.target.id}`);
                dbSet(itemRef, e.target.checked);
            });
        });

        // --------------------------------------------------
        // 3. リセットボタン：データベースを一括で消去
        // --------------------------------------------------
        if (resetButton) {
            resetButton.addEventListener('click', () => {
                if (!confirm('家族全員のチェックリストをすべてリセットしますか？')) {
                    return;
                }
                dbSet(checklistRef, null); // データを空にする
            });
        }
    }
});