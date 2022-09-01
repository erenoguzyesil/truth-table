const selects = {
    statement1: document.getElementById('statement-1'),
    statement2: document.getElementById('statement-2'),
    connective: document.getElementById('logical-connective')
}

const radioButtons = {
    word: document.getElementById('option-word'),
    number: document.getElementById('option-number'),
    abbreviation: document.getElementById('option-abbreviation')
}

const truthTable = document.getElementById('truth-table');

const operations = {
    implies: (s1, s2) => {
        if (s1 == false) {
            return true;
        } else if (s2 == false) {
            return false;
        } else {
            return true;
        }
    },

    and: function (s1, s2) { return !(this.implies(s1, !s2)); },
    or: function (s1, s2) { return this.implies(!s1, s2); },
    xor: function (s1, s2) { return !(s1 == s2) },
    iff: function (s1, s2) { return s1 == s2; }
}

function capitalize(x) {
    let truthValues = [];

    if (radioButtons.word.checked) truthValues = ['True', 'False'];
    if (radioButtons.abbreviation.checked) truthValues = ['T', 'F'];
    if (radioButtons.number.checked) truthValues = ['1', '0'];

    if (x == true) {
        return truthValues[0];
    } else {
        return truthValues[1];
    }
}

function generator(s1, s2, connective, s1negated, s2negated) {
    let result = '';

    let negation1 = '';
    let negation2 = '';
    let output = '';

    if (s1negated) {
        negation1 = `<td>${capitalize(!s1)}</td>`;
        output = capitalize(operations[connective](!s1, s2));
    }

    if (s2negated) {
        negation2 = `<td>${capitalize(!s2)}</td>`;
        output = capitalize(operations[connective](s1, !s2));
    }

    if (!s1negated && !s2negated) {
        output = capitalize(operations[connective](s1, s2));
    }

    if (s1negated && s2negated) {
        output = capitalize(operations[connective](!s1, !s2));
    }

    result = `
    <tr>
        <td>${capitalize(s1)}</td> <!-- p -->
        <td>${capitalize(s2)}</td> <!-- q -->
        ${negation1}
        ${negation2}

        <td>${output}</td>
    </tr>
    `;

    return result;
}

function makeTable(connective, s1negated, s2negated) {
    let result = '';

    let negation1 = '';
    let negation2 = '';
    let not1 = '';
    let not2 = '';

    if (s1negated) {
        negation1 = `<th>not p</th>`;
        not1 = 'not';
    }

    if (s2negated) {
        negation2 = `<th>not q</th>`;
        not2 = 'not';
    }

    let x = connective;

    if (connective == 'iff') {
        x = 'if and only if';
    }

    result = `
    <tr>
        <th>p</th>
        <th>q</th>
        ${negation1}
        ${negation2}
        <th>${not1} p ${x} ${not2} q</th>
    </tr>

    ${generator(true, true, connective, s1negated, s2negated)}
    ${generator(true, false, connective, s1negated, s2negated)}
    ${generator(false, true, connective, s1negated, s2negated)}
    ${generator(false, false, connective, s1negated, s2negated)}
    `;

    return result;
}

function run() {
    Object.values(selects).forEach(e => {
        addEventListener('change', () => {
            let connective = selects.connective.value;

            let pNegated = false;
            let qNegated = false;

            if (selects.statement1.value == 'negated') { pNegated = true; }
            if (selects.statement2.value == 'negated') { qNegated = true; }

            truthTable.innerHTML = makeTable(connective, pNegated, qNegated);

            if (truthTable.offsetWidth >= document.body.offsetWidth) {
                // If the table doesn't fit the screen:

                document.querySelectorAll('#truth-table td').forEach((e) => {
                    e.style.padding = '5px 10px';
                });

                document.querySelectorAll('#truth-table th').forEach((e) => {
                    e.style.padding = '5px';
                });
            }
        });
    });
}

Object.values(radioButtons).forEach((e) => {
    e.addEventListener('change', () => {
        run();
    });
});

window.addEventListener('load', () => {
    run();
    truthTable.innerHTML = makeTable('and', false, false);
});
