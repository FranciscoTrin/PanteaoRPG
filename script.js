document.addEventListener('DOMContentLoaded', () => {
    // --- INPUT AND OUTPUT ELEMENTS ---
    const forInput = document.getElementById('for');
    const desInput = document.getElementById('des');
    const conInput = document.getElementById('con');
    const intInput = document.getElementById('int');
    const sabInput = document.getElementById('sab');
    const carInput = document.getElementById('car');
    const nivelInput = document.getElementById('nivel');
    const classeInput = document.getElementById('classe');
    const iniciativaBonusInput = document.getElementById('iniciativa-bonus');
    const caArmaduraInput = document.getElementById('ca-armadura');
    const caExtraInput = document.getElementById('ca-extra');
    const dtAtributoSelect = document.getElementById('dt-atributo');
    const circuloInput = document.getElementById('circulo');
    const vidaAtualInput = document.getElementById('vida-atual');
    const energiaAtualInput = document.getElementById('energia-atual');
    const sanidadeAtualInput = document.getElementById('sanidade-atual');
    const arcanismoBaseInput = document.getElementById('pericia-arcasnismo-base');
    const characterImage = document.getElementById('character-image');
    const imageInput = document.getElementById('image-input');
    const vidaBonusInput = document.getElementById('vida-bonus');
    const energiaBonusInput = document.getElementById('energia-bonus');
    const fortitudeBaseInput = document.getElementById('pericia-fortitude-base');
    const reflexosBaseInput = document.getElementById('pericia-reflexos-base');
    
    const iniciativaTotalOutput = document.getElementById('iniciativa-total');
    const caBaseOutput = document.getElementById('ca-base');
    const caTotalOutput = document.getElementById('ca-total');
    const vidaTotalOutput = document.getElementById('vida-total');
    const energiaTotalOutput = document.getElementById('energia-total');
    const dtMagiasOutput = document.getElementById('dt-magias');
    
    // Pericia base inputs and modifier outputs
    const periciaBaseInputs = document.querySelectorAll('.pericia-item input:last-child');
    const periciaModOutputs = document.querySelectorAll('.pericia-item input:first-child');
    
    // All input elements that need to be saved
    const allInputs = document.querySelectorAll('input, textarea, select');

    // --- BUTTONS ---
    const exportButton = document.getElementById('export-button');
    const importButton = document.getElementById('import-button');
    const importFileInput = document.getElementById('import-file');
    const clearButton = document.getElementById('clear-button');
    const confirmModal = document.getElementById('confirm-modal-overlay');
    const confirmYesButton = document.getElementById('confirm-yes-button');
    const confirmNoButton = document.getElementById('confirm-no-button');

    // --- CLASS PROGRESSION DATA ---
    const classStats = {
        'Bárbaro': {
            vidaBase: 20, vidaPorNivel: 9, energiaBase: 35, energiaPorNivel: 12, iniciativaMod: 2,
            vidaBaseAumento: {4: 10, 8: 11, 12: 12, 16: 13}, energiaBaseAumento: {4: 13, 8: 14, 12: 15, 16: 16}, iniciativaAumento: {4: 3, 8: 4, 12: 5, 16: 6, 20: 7},
        },
        'Bardo': {
            vidaBase: 15, vidaPorNivel: 6, energiaBase: 40, energiaPorNivel: 15, iniciativaMod: 1,
            vidaBaseAumento: {4: 7, 8: 8, 12: 9, 16: 10}, energiaBaseAumento: {4: 16, 8: 17, 12: 18, 16: 19}, iniciativaAumento: {4: 2, 8: 3, 12: 4, 16: 5, 20: 6},
        },
        'Bruxo': {
            vidaBase: 30, vidaPorNivel: 10, energiaBase: 20, energiaPorNivel: 5, iniciativaMod: 0,
            vidaBaseAumento: {4: 11, 8: 12, 12: 13, 16: 14}, energiaBaseAumento: {4: 6, 8: 7, 12: 8, 16: 9}, iniciativaAumento: {4: 1, 8: 2, 12: 3, 16: 4, 20: 5},
        },
        'Caçador': {
            vidaBase: 16, vidaPorNivel: 6, energiaBase: 35, energiaPorNivel: 8, iniciativaMod: 3,
            vidaBaseAumento: {4: 7, 8: 8, 12: 9, 16: 10}, energiaBaseAumento: {4: 9, 8: 10, 12: 11, 16: 12}, iniciativaAumento: {4: 4, 8: 5, 12: 6, 16: 7, 20: 8},
        },
        'Clérigo': {
            vidaBase: 20, vidaPorNivel: 9, energiaBase: 35, energiaPorNivel: 12, iniciativaMod: 1,
            vidaBaseAumento: {4: 10, 8: 11, 12: 12, 16: 13}, energiaBaseAumento: {4: 13, 8: 14, 12: 15, 16: 16}, iniciativaAumento: {4: 2, 8: 3, 12: 4, 16: 5, 20: 6},
        },
        'Guerreiro': {
            vidaBase: 25, vidaPorNivel: 10, energiaBase: 30, energiaPorNivel: 7, iniciativaMod: 1,
            vidaBaseAumento: {4: 11, 8: 12, 12: 13, 16: 14}, energiaBaseAumento: {4: 8, 8: 9, 12: 10, 16: 11}, iniciativaAumento: {4: 2, 8: 3, 12: 4, 16: 5, 20: 6},
        },
        'Ladino': {
            vidaBase: 15, vidaPorNivel: 6, energiaBase: 25, energiaPorNivel: 8, iniciativaMod: 4,
            vidaBaseAumento: {4: 7, 8: 8, 12: 9, 16: 10}, energiaBaseAumento: {4: 9, 8: 10, 12: 11, 16: 12}, iniciativaAumento: {4: 5, 8: 6, 12: 7, 16: 8, 20: 9},
        },
        'Lutador': {
            vidaBase: 20, vidaPorNivel: 8, energiaBase: 25, energiaPorNivel: 7, iniciativaMod: 3,
            vidaBaseAumento: {4: 9, 8: 10, 12: 11, 16: 12}, energiaBaseAumento: {4: 8, 8: 9, 12: 10, 16: 11}, iniciativaAumento: {4: 4, 8: 5, 12: 6, 16: 7, 20: 8},
        },
        'Mago': {
            vidaBase: 14, vidaPorNivel: 5, energiaBase: 40, energiaPorNivel: 12, iniciativaMod: 2,
            vidaBaseAumento: {4: 6, 8: 7, 12: 8, 16: 9}, energiaBaseAumento: {4: 13, 8: 14, 12: 15, 16: 16}, iniciativaAumento: {4: 3, 8: 4, 12: 5, 16: 6, 20: 7},
        },
        'Pistoleiro': {
            vidaBase: 16, vidaPorNivel: 6, energiaBase: 30, energiaPorNivel: 8, iniciativaMod: 2,
            vidaBaseAumento: {4: 7, 8: 8, 12: 9, 16: 10}, energiaBaseAumento: {4: 9, 8: 10, 12: 11, 16: 12}, iniciativaAumento: {4: 3, 8: 4, 12: 5, 16: 6, 20: 7},
        },
        'Inquisidor': {
            vidaBase: 22, vidaPorNivel: 8, energiaBase: 35, energiaPorNivel: 10, iniciativaMod: 2,
            vidaBaseAumento: {4: 9, 8: 10, 12: 11, 16: 12}, energiaBaseAumento: {4: 12, 8: 13, 12: 14, 16: 15}, iniciativaAumento: {4: 3, 8: 4, 12: 5, 16: 6, 20: 7},
        },
        'Duelista': {
            vidaBase: 18, vidaPorNivel: 7, energiaBase: 30, energiaPorNivel: 9, iniciativaMod: 4,
            vidaBaseAumento: {4: 8, 8: 9, 12: 10, 16: 11}, energiaBaseAumento: {4: 10, 8: 11, 12: 12, 16: 13}, iniciativaAumento: {4: 5, 8: 6, 12: 7, 16: 8, 20: 9},
        },
        'Metamorfo': {
            vidaBase: 20, vidaPorNivel: 8, energiaBase: 30, energiaPorNivel: 10, iniciativaMod: 2,
            vidaBaseAumento: {4: 9, 8: 10, 12: 11, 16: 12}, energiaBaseAumento: {4: 11, 8: 12, 12: 13, 16: 14}, iniciativaAumento: {4: 3, 8: 4, 12: 5, 16: 6, 20: 7},
        },
        'Guardião Rúnico': {
            vidaBase: 22, vidaPorNivel: 9, energiaBase: 30, energiaPorNivel: 10, iniciativaMod: 1,
            vidaBaseAumento: {4: 10, 8: 11, 12: 12, 16: 13}, energiaBaseAumento: {4: 11, 8: 12, 12: 13, 16: 14}, iniciativaAumento: {4: 2, 8: 3, 12: 4, 16: 5, 20: 6},
        },
        'Guardião Elemental': {
            vidaBase: 20, vidaPorNivel: 8, energiaBase: 35, energiaPorNivel: 12, iniciativaMod: 2,
            vidaBaseAumento: {4: 9, 8: 10, 12: 11, 16: 12}, energiaBaseAumento: {4: 13, 8: 14, 12: 15, 16: 16}, iniciativaAumento: {4: 3, 8: 4, 12: 5, 16: 6, 20: 7},
        },
    };
    
    // Attribute input elements for DT calculation
    const attributeInputs = {
        'for': forInput, 'des': desInput, 'con': conInput, 'int': intInput, 'sab': sabInput, 'car': carInput
    };

    // --- SAVE AND LOAD FUNCTIONS (LOCAL STORAGE) ---
    function saveCharacterSheet() {
        const data = {};
        allInputs.forEach(input => {
            data[input.id] = input.value;
        });
        // Save image data as base64 string
        data['character-image-src'] = characterImage.src;
        localStorage.setItem('panteao_ficha_data', JSON.stringify(data));
        console.log('Ficha salva automaticamente no Local Storage!');
    }

    function loadCharacterSheet() {
        const savedData = localStorage.getItem('panteao_ficha_data');
        if (savedData) {
            const data = JSON.parse(savedData);
            allInputs.forEach(input => {
                if (data[input.id] !== undefined) {
                    input.value = data[input.id];
                }
            });
            // Load character image from Local Storage
            const savedImage = localStorage.getItem('character_image');
            if (savedImage) {
                characterImage.src = savedImage;
            }
            console.log('Ficha carregada do Local Storage!');
        }
    }

    // --- EXPORT/IMPORT FUNCTIONS (FILES) ---
    function exportSheet() {
        const data = {};
        allInputs.forEach(input => {
            data[input.id] = input.value;
        });
        // Save character image as base64 string
        data['character-image-src'] = characterImage.src;

        const jsonData = JSON.stringify(data, null, 2);
        const blob = new Blob([jsonData], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        
        const a = document.createElement('a');
        a.href = url;
        a.download = `ficha_${document.getElementById('nome').value || 'personagem'}.json`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    }

    function importSheet(event) {
        const file = event.target.files[0];
        if (!file) {
            return;
        }
        const reader = new FileReader();
        reader.onload = function(e) {
            try {
                const data = JSON.parse(e.target.result);
                allInputs.forEach(input => {
                    if (data[input.id] !== undefined) {
                        input.value = data[input.id];
                    }
                });
                // Load character image from the JSON file
                if (data['character-image-src']) {
                    characterImage.src = data['character-image-src'];
                    localStorage.setItem('character_image', data['character-image-src']);
                }
                updateStats(); // Recalculate everything after loading
                console.log('Ficha importada com sucesso!');
            } catch (error) {
                alert('Erro ao carregar o ficheiro. Por favor, verifique se é um ficheiro JSON válido.');
                console.error('Erro ao importar ficha:', error);
            }
        };
        reader.readAsText(file);
    }
    
    // --- CALCULATION LOGIC ---
    function updateStats() {
        // Get attribute and level values
        const forVal = parseInt(forInput.value) || 0;
        const desVal = parseInt(desInput.value) || 0;
        const conVal = parseInt(conInput.value) || 0;
        const intVal = parseInt(intInput.value) || 0;
        const sabVal = parseInt(sabInput.value) || 0;
        const carVal = parseInt(carInput.value) || 0;
        const nivelVal = parseInt(nivelInput.value) || 1;
        const iniciativaBonusVal = parseInt(iniciativaBonusInput.value) || 0;
        const caArmaduraVal = parseInt(caArmaduraInput.value) || 0;
        const caExtraVal = parseInt(caExtraInput.value) || 0;
        const arcanismoBaseVal = parseInt(arcanismoBaseInput.value) || 0;

        // Get class information from the data structure
        const classe = classeInput.value;
        const classInfo = classStats[classe] || {};

        // --- CALCULATE INICIATIVA ---
        let modClasseIniciativa = classInfo.iniciativaMod || 0;
        if (classInfo.iniciativaAumento && classInfo.iniciativaAumento[nivelVal]) {
            modClasseIniciativa = classInfo.iniciativaAumento[nivelVal];
        } else if (classInfo.iniciativaMod !== undefined) {
             modClasseIniciativa = classInfo.iniciativaMod + Math.floor((nivelVal - 1) / 3); // Aproximate mod based on levels
        } else {
            modClasseIniciativa = 0;
        }
        const iniciativaTotal = 10 + desVal + modClasseIniciativa + iniciativaBonusVal;
        iniciativaTotalOutput.value = iniciativaTotal;
        
        // --- CALCULATE CA ---
        const fortitudeBaseVal = parseInt(fortitudeBaseInput.value) || 0;
        const reflexosBaseVal = parseInt(reflexosBaseInput.value) || 0;
        const fortitudeMod = Math.floor(fortitudeBaseVal / 3);
        const reflexosMod = Math.floor(reflexosBaseVal / 3);

        const caBase = 10 + fortitudeMod + reflexosMod;
        caBaseOutput.value = caBase;
        const caTotal = caBase + caArmaduraVal + caExtraVal;
        caTotalOutput.value = caTotal;

        // --- CALCULATE VIDA ---
        let vidaBase = classInfo.vidaBase || 0;
        let vidaPorNivel = classInfo.vidaPorNivel || 0;
        if (classInfo.vidaBaseAumento && classInfo.vidaBaseAumento[nivelVal]) {
            vidaBase = classInfo.vidaBaseAumento[nivelVal];
        }
        const vidaBonusVal = parseInt(vidaBonusInput.value) || 0;
        const vidaTotal = vidaBase + conVal + (vidaPorNivel * (nivelVal - 1)) + vidaBonusVal;
        vidaTotalOutput.value = vidaTotal;

        // --- CALCULATE ENERGIA ---
        let energiaBase = classInfo.energiaBase || 0;
        let energiaPorNivel = classInfo.energiaPorNivel || 0;
        if (classInfo.energiaBaseAumento && classInfo.energiaBaseAumento[nivelVal]) {
            energiaBase = classInfo.energiaBaseAumento[nivelVal];
        }
        let mainStatMod = 0;
        switch(classe) {
            case 'Bárbaro': case 'Guerreiro': case 'Lutador': case 'Pistoleiro': case 'Duelista':
                mainStatMod = forVal;
                break;
            case 'Clérigo': case 'Guardião Elemental': case 'Inquisidor': case 'Xamã':
                mainStatMod = sabVal;
                break;
            case 'Bardo': case 'Bruxo': case 'Mago': case 'Guardião Rúnico':
                mainStatMod = intVal;
                break;
            case 'Metamorfo':
                mainStatMod = conVal;
                break;
            default:
                mainStatMod = 0;
        }
        const energiaBonusVal = parseInt(energiaBonusInput.value) || 0;
        const energiaTotal = (energiaBase + mainStatMod) + (energiaPorNivel * (nivelVal - 1)) + energiaBonusVal;
        energiaTotalOutput.value = energiaTotal;
        
        // --- CALCULATE DT MAGIAS ---
        const dtAtributo = dtAtributoSelect.value;
        const dtAtributoMod = parseInt(attributeInputs[dtAtributo].value) || 0;
        const arcanismoMod = Math.floor(arcanismoBaseVal / 3);
        const dtMagias = 10 + nivelVal + arcanismoMod + dtAtributoMod;
        dtMagiasOutput.value = dtMagias;

        // --- CALCULATE PERICIA MODIFIERS ---
        periciaBaseInputs.forEach((input, index) => {
            const periciaValue = parseInt(input.value) || 0;
            const modValue = Math.floor(periciaValue / 3);
            periciaModOutputs[index].value = modValue;
        });

        // --- UPDATE CURRENT VALUES IF NEEDED ---
        if (vidaAtualInput.value === '' || parseInt(vidaAtualInput.value) > vidaTotal) {
             vidaAtualInput.value = vidaTotal;
        }
        if (energiaAtualInput.value === '' || parseInt(energiaAtualInput.value) > energiaTotal) {
            energiaAtualInput.value = energiaTotal;
        }

        // --- SAVE TO LOCAL STORAGE ---
        saveCharacterSheet();
    }
    
    // --- EVENT LISTENERS ---
    const inputsToWatch = document.querySelectorAll(
        '#for, #des, #con, #int, #sab, #car, #nivel, #classe, #iniciativa-bonus, #ca-armadura, #ca-extra, #dt-atributo, .pericia-item input:last-child, #vida-bonus, #energia-bonus'
    );
    inputsToWatch.forEach(input => {
        input.addEventListener('input', updateStats);
    });

    exportButton.addEventListener('click', exportSheet);
    importButton.addEventListener('click', () => importFileInput.click());
    importFileInput.addEventListener('change', importSheet);
    
    // --- LÓGICA DO MODAL DE CONFIRMAÇÃO DE LIMPEZA ---
    
    // O botão "Limpar Ficha" agora apenas abre o modal
    clearButton.addEventListener('click', () => {
        confirmModal.classList.remove('hidden');
    });

    // O botão "Não" apenas fecha o modal
    confirmNoButton.addEventListener('click', () => {
        confirmModal.classList.add('hidden');
    });

    // O botão "Sim" executa a limpeza e depois fecha o modal
    confirmYesButton.addEventListener('click', () => {
        // Limpa os dados guardados no browser
        localStorage.removeItem('panteao_ficha_data');
        localStorage.removeItem('character_image');

        // Percorre todos os campos e reinicia-os
        allInputs.forEach(input => {
            const tag = input.tagName.toLowerCase();

            if (tag === 'textarea') {
                input.value = '';
            } else if (tag === 'select') {
                input.selectedIndex = 0; // Volta para a primeira opção
            } else if (input.type === 'text') {
                input.value = '';
            } else if (input.type === 'number') {
                // Valores padrão para campos numéricos
                switch(input.id) {
                    case 'nivel':
                    case 'circulo':
                        input.value = '1';
                        break;
                    default:
                        input.value = '0';
                }
            }
        });

        // Reinicia a imagem do personagem
        characterImage.src = 'https://via.placeholder.com/150x200.png?text=Imagem';

        // Força a atualização de todos os campos calculados
        updateStats();

        // Fecha o modal e avisa o utilizador
        confirmModal.classList.add('hidden');
        console.log('Ficha limpa com sucesso!');
        alert('A ficha foi limpa.');
    });

    imageInput.addEventListener('change', (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = function(e) {
                characterImage.src = e.target.result;
                localStorage.setItem('character_image', e.target.result);
            };
            reader.readAsDataURL(file);
        }
    });

    // --- INITIAL LOAD AND CALCULATION ---
    loadCharacterSheet();
    updateStats();
});