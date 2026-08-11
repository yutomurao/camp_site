// DOM（画面の要素）が完全に読み込まれたら処理を開始
document.addEventListener('DOMContentLoaded', () => {

    // 画面上のすべてのチェックボックスを取得
    const checkboxes = document.querySelectorAll('.check-input');
    // リセットボタンを取得
    const resetButton = document.getElementById('reset-btn');

    // --------------------------------------------------
    // 1. ページ読み込み時：保存されたチェック状態を復元する
    // --------------------------------------------------
    checkboxes.forEach((checkbox) => {
        // LocalStorageから各アイテムの保存状態を取得（'true' かどうか）
        const isChecked = localStorage.getItem(checkbox.id) === 'true';
        
        // 保存されていた値（true/false）をチェックボックスに反映
        checkbox.checked = isChecked;
    });

    // --------------------------------------------------
    // 2. チェックボックスの操作時：状態をLocalStorageに保存する
    // --------------------------------------------------
    checkboxes.forEach((checkbox) => {
        checkbox.addEventListener('change', (e) => {
            // チェックのON/OFF（true/false）を要素のidをキーにして保存
            localStorage.setItem(e.target.id, e.target.checked);
        });
    });

    // --------------------------------------------------
    // 3. リセットボタンクリック時：すべてのチェックを外して保存も消去
    // --------------------------------------------------
    if (resetButton) {
        resetButton.addEventListener('click', () => {
            // 確認のポップアップを出す（キャンセルされたら処理を中断）
            if (!confirm('チェックリストをすべてリセットしますか？')) {
                return;
            }

            // 全チェックボックスのチェックを外す
            checkboxes.forEach((checkbox) => {
                checkbox.checked = false;
                // LocalStorageからも削除
                localStorage.removeItem(checkbox.id);
            });
        });
    }

});