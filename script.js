const spreadsheet = document.getElementById('spreadsheet');
const rows = 10;
const cols = 10;

//Create cells

for(let i = 0; i < rows; i++)
{
    for(let j = 0; j < cols; j++)
    {
        const cell = document.createElement('div');
        cell.classList.add('cell');
        cell.setAttribute('contenteditable', 'true');
        cell.setAttribute('data-row', i);
        cell.setAttribute('data-col', j);
        cell.addEventListener('input', handleCellInput);
        spreadsheet.appendChild(cell);    

    }
}

// Handle cell input

function handleCellInput(event)
{
    const cell = event.target;
    const value = cell.innerText;
    console.log('Cell [${cell.dataset.row}, ${cell.dataset.col}] updated to: ${value}');

}

// Update cell formula
function updateCellFormula() {
  const formulaInput = document.getElementById('formula-input');
  const activeCell = document.querySelector('.cell:focus');
  if (activeCell) {
    activeCell.innerText = formulaInput.value;
  }
}

// Format cell
function formatCell(style) {
  const activeCell = document.querySelector('.cell:focus');
  if (activeCell) {
    switch (style) {
      case 'bold':
        activeCell.style.fontWeight = activeCell.style.fontWeight === 'bold' ? 'normal' : 'bold';
        break;
      case 'italic':
        activeCell.style.fontStyle = activeCell.style.fontStyle === 'italic' ? 'normal' : 'italic';
        break;
      case 'underline':
        activeCell.style.textDecoration = activeCell.style.textDecoration === 'underline' ? 'none' : 'underline';
        break;
    }
  }
}

// Add row
function addRow() {
  const currentRows = spreadsheet.childElementCount / cols;
  for (let j = 0; j < cols; j++) {
    const cell = document.createElement('div');
    cell.classList.add('cell');
    cell.setAttribute('contenteditable', 'true');
    cell.setAttribute('data-row', currentRows);
    cell.setAttribute('data-col', j);
    cell.addEventListener('input', handleCellInput);
    spreadsheet.appendChild(cell);
  }
}

// Add column
function addColumn() {
  const currentCols = spreadsheet.childElementCount / rows;
  for (let i = 0; i < rows; i++) {
    const cell = document.createElement('div');
    cell.classList.add('cell');
    cell.setAttribute('contenteditable', 'true');
    cell.setAttribute('data-row', i);
    cell.setAttribute('data-col', currentCols);
    cell.addEventListener('input', handleCellInput);
    spreadsheet.appendChild(cell);
  }
}



function updateCell(event) {
    const cell = event.target;
    const value = cell.innerText;
    // Handle cell dependencies and formulas here
}

function applyBold() {
    document.execCommand('bold');
}

function applyItalic() {
    document.execCommand('italic');
}

function applyUpper() {
    const selectedCell = document.querySelector('.cell:focus');
    if (selectedCell) {
        selectedCell.innerText = selectedCell.innerText.toUpperCase();
    }
}

function applyLower() {
    const selectedCell = document.querySelector('.cell:focus');
    if (selectedCell) {
        selectedCell.innerText = selectedCell.innerText.toLowerCase();
    }
}

function removeDuplicates() {
    const cells = document.querySelectorAll('.cell');
    const values = Array.from(cells).map(cell => cell.innerText);
    const uniqueValues = [...new Set(values)];
    cells.forEach((cell, index) => {
        cell.innerText = uniqueValues[index] || '';
    });
}

function findAndReplace() 
{
    const findText = prompt("Enter text to find:");
    const replaceText = prompt("Enter text to replace with:");
    const cells = document.querySelectorAll('.cell');
    cells.forEach(cell => {
        if (cell.innerText.includes(findText)) {
            cell.innerText = cell.innerText.replace(new RegExp(findText, 'g'), replaceText);
        }
    });
}
// Mathematical functions
function SUM(range) {
  return range.reduce((acc, val) => acc + (parseFloat(val) || 0), 0);
}

function AVERAGE(range) {
  const sum = SUM(range);
  return sum / range.length;
}

function MAX(range) {
  return Math.max(...range.map(val => parseFloat(val) || 0));
}

function MIN(range) {
  return Math.min(...range.map(val => parseFloat(val) || 0));
}

function COUNT(range) {
  return range.filter(val => !isNaN(parseFloat(val))).length;
}
