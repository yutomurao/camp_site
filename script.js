document.addEventListener('DOMContentLoaded', () => {
    const checkboxes = document.querySelectorAll('.checklist input[type="checkbox"]');
    const resetBtn = document.getElementById('reset-btn');

    // 1. ページ読み込み時に LocalStorage から状態を復元
    checkboxes.forEach(checkbox => {
        const isChecked = localStorage.getItem(checkbox.id) === 'true';
        checkbox.checked = isChecked;
        
        // チェックが入っている場合は見た目（打ち消し線など）を適用
        if (isChecked) {
            checkbox.parentElement.classList.add('checked');
        }

        // 2. チェックボックスの状態が変わった時のイベントリスナー
        checkbox.addEventListener('change', (e) => {
            const checked = e.target.checked;
            // ローカルストレージに保存
            localStorage.setItem(e.target.id, checked);
            
            // 親要素のlabelにクラスをつけ外し（打ち消し線用）
            if (checked) {
                e.target.parentElement.classList.add('checked');
            } else {
                e.target.parentElement.classList.remove('checked');
            }
        });
    });

    // 3. リセットボタンの処理
    resetBtn.addEventListener('click', () => {
        if (confirm('すべてのチェックを解除しますか？')) {
            checkboxes.forEach(checkbox => {
                checkbox.checked = false;
                localStorage.removeItem(checkbox.id);
                checkbox.parentElement.classList.remove('checked');
            });
        }
    });
});