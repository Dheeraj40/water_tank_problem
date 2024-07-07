function solveWaterTankProblem() {
    const input = document.getElementById('block-heights').value;
    const heights = input.split(',').map(Number);
    const n = heights.length;

    if (n === 0) return;

    const leftMax = new Array(n).fill(0);
    const rightMax = new Array(n).fill(0);

    leftMax[0] = heights[0];
    for (let i = 1; i < n; i++) {
        leftMax[i] = Math.max(leftMax[i - 1], heights[i]);
    }

    rightMax[n - 1] = heights[n - 1];
    for (let i = n - 2; i >= 0; i--) {
        rightMax[i] = Math.max(rightMax[i + 1], heights[i]);
    }

    let totalWater = 0;
    const water = new Array(n).fill(0);
    for (let i = 0; i < n; i++) {
        water[i] = Math.min(leftMax[i], rightMax[i]) - heights[i];
        if (water[i] > 0) totalWater += water[i];
    }

    renderResult(heights, water);
}

function renderResult(heights, water) {
    const output = document.getElementById('output');
    output.innerHTML = '';

    const maxBlockHeight = Math.max(...heights);
    for (let i = maxBlockHeight; i > 0; i--) {
        const row = document.createElement('div');
        row.classList.add('row');

        for (let j = 0; j < heights.length; j++) {
            const block = document.createElement('div');
            if (heights[j] >= i) {
                block.classList.add('block');
            } else if (heights[j] + water[j] >= i) {
                block.classList.add('water');
            } else {
                block.classList.add('empty');
            }
            row.appendChild(block);
        }
        output.appendChild(row);
    }
}
