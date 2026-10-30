(function(){'use strict';
// Every row: Spanish | English | French | German | Italian | Portuguese | Swedish.
const rows=`Tu dinero, más claro.|Your money, clearer.|Votre argent, plus clair.|Dein Geld, klarer.|I tuoi soldi, più chiari.|Seu dinheiro, mais claro.|Dina pengar, tydligare.
Finanzas personales, claras y bajo control.|Personal finances, clear and under control.|Vos finances, claires et maîtrisées.|Persönliche Finanzen, klar im Griff.|Finanze personali chiare e sotto controllo.|Finanças pessoais claras e sob controle.|Privatekonomi, tydlig och under kontroll.
ABRIR m.cfinova IA|OPEN m.cfinova AI|OUVRIR m.cfinova IA|m.cfinova KI ÖFFNEN|APRI m.cfinova IA|ABRIR m.cfinova IA|ÖPPNA m.cfinova AI
Modalidad de m.cfinova|m.cfinova mode|Mode m.cfinova|m.cfinova-Modus|Modalità m.cfinova|Modo m.cfinova|m.cfinova-läge
Personal|Personal|Personnel|Privat|Personale|Pessoal|Privat
Negocios|Business|Professionnel|Geschäftlich|Attività|Negócios|Företag
Dos espacios separados en este navegador|Two separate spaces in this browser|Deux espaces séparés dans ce navigateur|Zwei getrennte Bereiche in diesem Browser|Due spazi separati in questo browser|Dois espaços separados neste navegador|Två separata utrymmen i den här webbläsaren
Inicio|Home|Accueil|Start|Home|Início|Hem
Mi negocio|My business|Mon activité|Mein Geschäft|La mia attività|Meu negócio|Mitt företag
Movimientos|Transactions|Opérations|Buchungen|Movimenti|Movimentações|Transaktioner
Préstamos|Loans|Prêts|Kredite|Prestiti|Empréstimos|Lån
Facturas|Bills|Factures|Rechnungen|Fatture|Faturas|Fakturor
Documentos|Documents|Documents|Dokumente|Documenti|Documentos|Dokument
Ahorros|Savings|Épargne|Sparen|Risparmi|Poupança|Sparande
Configuración|Settings|Paramètres|Einstellungen|Impostazioni|Configurações|Inställningar
Abrir mi agente m.cfinova IA · Hablar o escribir|Open m.cfinova AI · Speak or type|Ouvrir m.cfinova IA · Parler ou écrire|m.cfinova KI öffnen · Sprechen oder schreiben|Apri m.cfinova IA · Parla o scrivi|Abrir m.cfinova IA · Falar ou escrever|Öppna m.cfinova AI · Tala eller skriv
TU RESUMEN FINANCIERO|YOUR FINANCIAL OVERVIEW|VOTRE BILAN FINANCIER|DEIN FINANZÜBERBLICK|IL TUO RIEPILOGO FINANZIARIO|SEU RESUMO FINANCEIRO|DIN EKONOMISKA ÖVERSIKT
¡Hola! 👋|Hello! 👋|Bonjour ! 👋|Hallo! 👋|Ciao! 👋|Olá! 👋|Hej! 👋
Aquí tienes un resumen de tus finanzas.|Here is an overview of your finances.|Voici un aperçu de vos finances.|Hier ist dein Finanzüberblick.|Ecco un riepilogo delle tue finanze.|Aqui está um resumo das suas finanças.|Här är en översikt över din ekonomi.
Consultar m.cfinova IA|Ask m.cfinova AI|Consulter m.cfinova IA|m.cfinova KI fragen|Consulta m.cfinova IA|Consultar m.cfinova IA|Fråga m.cfinova AI
Ingresos del mes|Monthly income|Revenus du mois|Monatseinnahmen|Entrate del mese|Receitas do mês|Månadens inkomster
Gastos|Expenses|Dépenses|Ausgaben|Spese|Despesas|Utgifter
Disponible|Available|Disponible|Verfügbar|Disponibile|Disponível|Tillgängligt
Ahorro objetivo|Savings estimate|Estimation d’épargne|Sparschätzung|Stima del risparmio|Estimativa de poupança|Uppskattat sparande
Gastos por categorías|Expenses by category|Dépenses par catégorie|Ausgaben nach Kategorie|Spese per categoria|Despesas por categoria|Utgifter per kategori
Este mes|This month|Ce mois-ci|Diesen Monat|Questo mese|Este mês|Den här månaden
este mes|this month|ce mois-ci|diesen Monat|questo mese|este mês|den här månaden
Evolución de gastos|Expense trends|Évolution des dépenses|Ausgabenentwicklung|Andamento delle spese|Evolução das despesas|Utgiftsutveckling
6 meses|6 months|6 mois|6 Monate|6 mesi|6 meses|6 månader
Movimientos recientes|Recent transactions|Opérations récentes|Letzte Buchungen|Movimenti recenti|Movimentações recentes|Senaste transaktionerna
Ver todos →|View all →|Tout voir →|Alle anzeigen →|Vedi tutti →|Ver todos →|Visa alla →
Ver todas →|View all →|Tout voir →|Alle anzeigen →|Vedi tutte →|Ver todas →|Visa alla →
Próximas facturas|Upcoming bills|Prochaines factures|Anstehende Rechnungen|Prossime fatture|Próximas faturas|Kommande fakturor
Balance mensual|Monthly balance|Solde mensuel|Monatssaldo|Saldo mensile|Saldo mensal|Månadssaldo
Este mes ⌄|This month ⌄|Ce mois-ci ⌄|Diesen Monat ⌄|Questo mese ⌄|Este mês ⌄|Den här månaden ⌄
Disponible para este mes|Available this month|Disponible ce mois-ci|Diesen Monat verfügbar|Disponibile questo mese|Disponível este mês|Tillgängligt den här månaden
Objetivo de ahorro|Savings goal|Objectif d’épargne|Sparziel|Obiettivo di risparmio|Meta de poupança|Sparmål
Ver detalles →|View details →|Voir les détails →|Details anzeigen →|Vedi dettagli →|Ver detalhes →|Visa detaljer →
Tu asistente financiero|Your financial assistant|Votre assistant financier|Dein Finanzassistent|Il tuo assistente finanziario|Seu assistente financeiro|Din ekonomiassistent
¿En qué puedo ayudarte hoy?|How can I help today?|Comment puis-je vous aider ?|Wie kann ich heute helfen?|Come posso aiutarti oggi?|Como posso ajudar hoje?|Hur kan jag hjälpa dig idag?
¿En qué gasto más?|Where do I spend most?|Où est-ce que je dépense le plus ?|Wofür gebe ich am meisten aus?|Dove spendo di più?|Onde gasto mais?|Vad lägger jag mest pengar på?
Crear un presupuesto|Create a budget|Créer un budget|Budget erstellen|Crea un budget|Criar um orçamento|Skapa en budget
¿Cuánto puedo ahorrar?|How much can I save?|Combien puis-je épargner ?|Wie viel kann ich sparen?|Quanto posso risparmiare?|Quanto posso poupar?|Hur mycket kan jag spara?
Escribe tu pregunta →|Type your question →|Écrivez votre question →|Schreibe deine Frage →|Scrivi la tua domanda →|Escreva sua pergunta →|Skriv din fråga →
m.cfinova · FINANZAS INTELIGENTES|m.cfinova · SMART FINANCES|m.cfinova · FINANCES INTELLIGENTES|m.cfinova · SMARTE FINANZEN|m.cfinova · FINANZE INTELLIGENTI|m.cfinova · FINANÇAS INTELIGENTES|m.cfinova · SMART EKONOMI
Organiza tus finanzas gratis con m.cfinova. 💜|Organise your finances free with m.cfinova. 💜|Organisez vos finances gratuitement avec m.cfinova. 💜|Organisiere deine Finanzen kostenlos mit m.cfinova. 💜|Organizza gratis le tue finanze con m.cfinova. 💜|Organize suas finanças grátis com m.cfinova. 💜|Ordna din ekonomi gratis med m.cfinova. 💜
Controla tus ingresos, gastos, préstamos, facturas, documentos y objetivos de ahorro desde un solo lugar.|Track income, expenses, loans, bills, documents and savings goals in one place.|Suivez revenus, dépenses, prêts, factures, documents et objectifs d’épargne au même endroit.|Verwalte Einnahmen, Ausgaben, Kredite, Rechnungen, Dokumente und Sparziele an einem Ort.|Gestisci entrate, spese, prestiti, fatture, documenti e obiettivi di risparmio in un unico posto.|Controle receitas, despesas, empréstimos, faturas, documentos e metas de poupança em um só lugar.|Hantera inkomster, utgifter, lån, fakturor, dokument och sparmål på ett ställe.
Crear cuenta gratis|Create a free account|Créer un compte gratuit|Kostenloses Konto erstellen|Crea un account gratuito|Criar conta grátis|Skapa ett gratis konto
Iniciar sesión|Sign in|Se connecter|Anmelden|Accedi|Entrar|Logga in
Ver Premium|View Premium|Voir Premium|Premium ansehen|Vedi Premium|Ver Premium|Visa Premium
Comparte m.cfinova|Share m.cfinova|Partager m.cfinova|m.cfinova teilen|Condividi m.cfinova|Compartilhar m.cfinova|Dela m.cfinova
Escanea para abrir m.cfinova|Scan to open m.cfinova|Scannez pour ouvrir m.cfinova|Scannen, um m.cfinova zu öffnen|Scansiona per aprire m.cfinova|Digitalize para abrir m.cfinova|Skanna för att öppna m.cfinova
Escanea tus tickets|Scan your receipts|Scannez vos reçus|Belege scannen|Scansiona i tuoi scontrini|Digitalize seus recibos|Skanna dina kvitton
Haz una foto o sube una factura y guarda tus documentos.|Take a photo or upload a bill and save your documents.|Prenez une photo ou importez une facture et conservez vos documents.|Fotografiere oder lade eine Rechnung hoch und speichere deine Dokumente.|Scatta una foto o carica una fattura e salva i tuoi documenti.|Tire uma foto ou envie uma fatura e salve seus documentos.|Ta en bild eller ladda upp en faktura och spara dina dokument.
Abrir cámara|Open camera|Ouvrir la caméra|Kamera öffnen|Apri fotocamera|Abrir câmera|Öppna kameran
Subir PDF o imagen|Upload PDF or image|Importer un PDF ou une image|PDF oder Bild hochladen|Carica PDF o immagine|Enviar PDF ou imagem|Ladda upp PDF eller bild
Nuevo movimiento|New transaction|Nouvelle opération|Neue Buchung|Nuovo movimento|Nova movimentação|Ny transaktion
Escanear ticket|Scan receipt|Scanner un reçu|Beleg scannen|Scansiona scontrino|Digitalizar recibo|Skanna kvitto
Mis facturas|My bills|Mes factures|Meine Rechnungen|Le mie fatture|Minhas faturas|Mina fakturor
Presupuesto mensual|Monthly budget|Budget mensuel|Monatsbudget|Budget mensile|Orçamento mensal|Månadsbudget
Necesidades|Essentials|Besoins essentiels|Grundbedarf|Necessità|Necessidades|Nödvändiga utgifter
Deudas / préstamos|Debts / loans|Dettes / prêts|Schulden / Kredite|Debiti / prestiti|Dívidas / empréstimos|Skulder / lån
Ahorro|Savings|Épargne|Ersparnisse|Risparmio|Poupança|Sparande
Regla sugerida: reserva primero tu ahorro, cubre facturas y deudas y después usa el dinero restante para gastos variables.|Suggested rule: set aside savings, cover bills and debts, then use the rest for variable expenses.|Suggestion : épargnez, couvrez factures et dettes, puis utilisez le reste pour les dépenses variables.|Vorschlag: zuerst sparen, Rechnungen und Schulden decken, dann variable Ausgaben planen.|Suggerimento: accantona i risparmi, copri fatture e debiti, poi le spese variabili.|Sugestão: reserve a poupança, cubra faturas e dívidas e use o restante para despesas variáveis.|Förslag: avsätt sparande, täck räkningar och skulder och använd resten till rörliga utgifter.
Próximos pagos|Upcoming payments|Prochains paiements|Anstehende Zahlungen|Prossimi pagamenti|Próximos pagamentos|Kommande betalningar
m.cfinova NEGOCIOS|m.cfinova BUSINESS|m.cfinova PRO|m.cfinova GESCHÄFTLICH|m.cfinova ATTIVITÀ|m.cfinova NEGÓCIOS|m.cfinova FÖRETAG
Tu negocio, bajo control 🏪|Your business, under control 🏪|Votre activité, sous contrôle 🏪|Dein Geschäft im Griff 🏪|La tua attività, sotto controllo 🏪|Seu negócio sob controle 🏪|Ditt företag, under kontroll 🏪
Registra ventas, compras y gastos de tu comercio sin mezclar los movimientos personales.|Record sales, purchases and business expenses separately from personal transactions.|Enregistrez ventes, achats et frais séparément de vos opérations personnelles.|Erfasse Verkäufe, Einkäufe und Geschäftsausgaben getrennt von privaten Buchungen.|Registra vendite, acquisti e spese aziendali separatamente dai movimenti personali.|Registre vendas, compras e despesas do negócio separadamente dos movimentos pessoais.|Registrera försäljning, inköp och företagsutgifter separat från privata transaktioner.
Registrar venta|Record sale|Enregistrer une vente|Verkauf erfassen|Registra vendita|Registrar venda|Registrera försäljning
Registrar gasto|Record expense|Enregistrer une dépense|Ausgabe erfassen|Registra spesa|Registrar despesa|Registrera utgift
Ventas registradas|Recorded sales|Ventes enregistrées|Erfasste Verkäufe|Vendite registrate|Vendas registradas|Registrerad försäljning
Gastos del negocio|Business expenses|Frais professionnels|Geschäftsausgaben|Spese aziendali|Despesas do negócio|Företagsutgifter
Resultado estimado|Estimated result|Résultat estimé|Geschätztes Ergebnis|Risultato stimato|Resultado estimado|Uppskattat resultat
Registrar movimiento comercial|Record a business transaction|Enregistrer une opération professionnelle|Geschäftsbuchung erfassen|Registra movimento aziendale|Registrar movimentação comercial|Registrera företagstransaktion
Anota ventas y gastos. Los importes son manuales y no sustituyen la contabilidad oficial.|Record sales and expenses manually. This does not replace official accounting.|Saisissez ventes et frais manuellement. Cela ne remplace pas la comptabilité officielle.|Verkäufe und Ausgaben manuell erfassen. Dies ersetzt keine offizielle Buchhaltung.|Registra vendite e spese manualmente. Non sostituisce la contabilità ufficiale.|Registre vendas e despesas manualmente. Não substitui a contabilidade oficial.|Registrera försäljning och utgifter manuellt. Detta ersätter inte officiell bokföring.
Venta / ingreso|Sale / income|Vente / revenu|Verkauf / Einnahme|Vendita / entrata|Venda / receita|Försäljning / inkomst
Compra / gasto|Purchase / expense|Achat / dépense|Einkauf / Ausgabe|Acquisto / spesa|Compra / despesa|Inköp / utgift
Ventas|Sales|Ventes|Verkäufe|Vendite|Vendas|Försäljning
Proveedores|Suppliers|Fournisseurs|Lieferanten|Fornitori|Fornecedores|Leverantörer
Alquiler|Rent|Loyer|Miete|Affitto|Aluguel|Hyra
Servicios|Services|Services|Dienstleistungen|Servizi|Serviços|Tjänster
Transporte|Transport|Transport|Transport|Trasporti|Transporte|Transport
Impuestos|Taxes|Impôts|Steuern|Imposte|Impostos|Skatter
Otros|Other|Autres|Sonstiges|Altro|Outros|Övrigt
Guardar movimiento|Save transaction|Enregistrer l’opération|Buchung speichern|Salva movimento|Salvar movimentação|Spara transaktion
Resumen del negocio|Business overview|Bilan de l’activité|Geschäftsübersicht|Riepilogo attività|Resumo do negócio|Företagsöversikt
Diferencia entre ventas y gastos registrados, antes de ajustes fiscales y contables.|Recorded sales minus expenses, before tax and accounting adjustments.|Ventes moins dépenses enregistrées, avant ajustements fiscaux et comptables.|Erfasste Verkäufe abzüglich Ausgaben, vor Steuer- und Buchhaltungsanpassungen.|Differenza tra vendite e spese, prima delle rettifiche fiscali e contabili.|Vendas menos despesas registradas, antes de ajustes fiscais e contábeis.|Registrerad försäljning minus utgifter, före skatte- och bokföringsjusteringar.
Copia personal + negocios|Personal + business backup|Sauvegarde personnel + professionnel|Sicherung Privat + Geschäftlich|Backup personale + attività|Cópia pessoal + negócios|Säkerhetskopia privat + företag
Últimos movimientos comerciales|Recent business transactions|Dernières opérations professionnelles|Letzte Geschäftsbuchungen|Ultimi movimenti aziendali|Últimas movimentações comerciais|Senaste företagstransaktionerna
Añadir movimiento|Add transaction|Ajouter une opération|Buchung hinzufügen|Aggiungi movimento|Adicionar movimentação|Lägg till transaktion
Ingreso|Income|Revenu|Einnahme|Entrata|Receita|Inkomst
Gasto|Expense|Dépense|Ausgabe|Spesa|Despesa|Utgift
Vivienda|Housing|Logement|Wohnen|Casa|Moradia|Boende
Alimentación|Food|Alimentation|Lebensmittel|Alimentari|Alimentação|Mat
Factura|Bill|Facture|Rechnung|Fattura|Fatura|Faktura
Tarjeta|Card|Carte|Karte|Carta|Cartão|Kort
Ocio|Leisure|Loisirs|Freizeit|Tempo libero|Lazer|Fritid
Salud|Health|Santé|Gesundheit|Salute|Saúde|Hälsa
Efectivo|Cash|Espèces|Bargeld|Contanti|Dinheiro|Kontanter
Transferencia|Bank transfer|Virement|Überweisung|Bonifico|Transferência|Banköverföring
Guardar|Save|Enregistrer|Speichern|Salva|Salvar|Spara
Fecha|Date|Date|Datum|Data|Data|Datum
Tipo|Type|Type|Typ|Tipo|Tipo|Typ
Descripción|Description|Description|Beschreibung|Descrizione|Descrição|Beskrivning
Categoría|Category|Catégorie|Kategorie|Categoria|Categoria|Kategori
Método|Method|Moyen|Methode|Metodo|Método|Metod
Importe|Amount|Montant|Betrag|Importo|Valor|Belopp
Añadir préstamo|Add loan|Ajouter un prêt|Kredit hinzufügen|Aggiungi prestito|Adicionar empréstimo|Lägg till lån
Avisos locales: verás las facturas próximas a vencer cuando abras m.cfinova. Todavía no se envían notificaciones fuera de la aplicación.|Local reminders: upcoming bills appear when you open m.cfinova. No notifications are sent outside the app.|Rappels locaux : les échéances apparaissent à l’ouverture de m.cfinova. Aucune notification hors de l’application.|Lokale Hinweise: Fällige Rechnungen erscheinen beim Öffnen von m.cfinova. Keine Benachrichtigungen außerhalb der App.|Promemoria locali: le fatture in scadenza appaiono aprendo m.cfinova. Nessuna notifica fuori dall’app.|Avisos locais: faturas a vencer aparecem ao abrir m.cfinova. Sem notificações fora do aplicativo.|Lokala påminnelser: kommande fakturor visas när du öppnar m.cfinova. Inga aviseringar skickas utanför appen.
Pendiente|Pending|En attente|Offen|In sospeso|Pendente|Obetald
Pagada|Paid|Payée|Bezahlt|Pagata|Paga|Betald
Añadir factura|Add bill|Ajouter une facture|Rechnung hinzufügen|Aggiungi fattura|Adicionar fatura|Lägg till faktura
Documentos financieros|Financial documents|Documents financiers|Finanzdokumente|Documenti finanziari|Documentos financeiros|Ekonomiska dokument
Escanea con la cámara, guarda tus comprobantes y encuéntralos por fecha, gasto, ahorro o método de pago.|Use the camera, save receipts and find them by date, expense, savings or payment method.|Utilisez la caméra, conservez vos justificatifs et retrouvez-les par date, dépense, épargne ou moyen de paiement.|Belege fotografieren, speichern und nach Datum, Ausgabe, Sparen oder Zahlungsart finden.|Usa la fotocamera, salva i documenti e cercali per data, spesa, risparmio o pagamento.|Use a câmera, salve comprovantes e encontre por data, despesa, poupança ou pagamento.|Använd kameran, spara underlag och hitta dem efter datum, utgift, sparande eller betalningssätt.
Tickets|Receipts|Reçus|Belege|Scontrini|Recibos|Kvitton
Pagos|Payments|Paiements|Zahlungen|Pagamenti|Pagamentos|Betalningar
Escanear / subir|Scan / upload|Scanner / importer|Scannen / hochladen|Scansiona / carica|Digitalizar / enviar|Skanna / ladda upp
Elegir archivo|Choose file|Choisir un fichier|Datei auswählen|Scegli file|Escolher arquivo|Välj fil
Ticket|Receipt|Reçu|Beleg|Scontrino|Recibo|Kvitto
Pago|Payment|Paiement|Zahlung|Pagamento|Pagamento|Betalning
Otro|Other|Autre|Sonstiges|Altro|Outro|Övrigt
Guardar documento|Save document|Enregistrer le document|Dokument speichern|Salva documento|Salvar documento|Spara dokument
m.cfinova IA · Leer ticket o factura|m.cfinova AI · Read receipt or bill|m.cfinova IA · Lire reçu ou facture|m.cfinova KI · Beleg oder Rechnung lesen|m.cfinova IA · Leggi scontrino o fattura|m.cfinova IA · Ler recibo ou fatura|m.cfinova AI · Läs kvitto eller faktura
Selecciona una imagen para reconocer sus datos. Revisa el resultado antes de guardar.|Choose an image to read its data. Review the result before saving.|Choisissez une image. Vérifiez les données reconnues avant de les enregistrer.|Wähle ein Bild. Prüfe die erkannten Daten vor dem Speichern.|Scegli un’immagine. Controlla i dati riconosciuti prima di salvarli.|Escolha uma imagem. Revise os dados reconhecidos antes de salvar.|Välj en bild. Granska de tolkade uppgifterna innan du sparar.
Revisar datos reconocidos|Review recognised data|Vérifier les données reconnues|Erkannte Daten prüfen|Controlla dati riconosciuti|Revisar dados reconhecidos|Granska tolkade uppgifter
Confirmar y registrar gasto|Confirm and record expense|Confirmer et enregistrer la dépense|Bestätigen und Ausgabe erfassen|Conferma e registra spesa|Confirmar e registrar despesa|Bekräfta och registrera utgift
Cancelar|Cancel|Annuler|Abbrechen|Annulla|Cancelar|Avbryt
El reconocimiento puede equivocarse. El gasto solo se registra al confirmar; guardar la imagen es un paso separado.|Recognition can make mistakes. The expense is recorded only after confirmation; saving the image is a separate step.|La reconnaissance peut se tromper. La dépense est enregistrée après confirmation ; l’image se sauvegarde séparément.|Die Erkennung kann Fehler machen. Ausgaben werden erst nach Bestätigung erfasst; das Bild wird separat gespeichert.|Il riconoscimento può sbagliare. La spesa viene registrata solo dopo la conferma; l’immagine si salva separatamente.|O reconhecimento pode errar. A despesa só é registrada após confirmação; a imagem é salva separadamente.|Tolkningen kan bli fel. Utgiften registreras först efter bekräftelse; bilden sparas separat.
Ningún archivo seleccionado.|No file selected.|Aucun fichier sélectionné.|Keine Datei ausgewählt.|Nessun file selezionato.|Nenhum arquivo selecionado.|Ingen fil vald.
En móvil puedes abrir la cámara para fotografiar un ticket o factura. Los documentos se guardan localmente en este navegador.|On mobile, open the camera to photograph a receipt or bill. Documents stay in this browser.|Sur mobile, photographiez un reçu ou une facture. Les documents restent dans ce navigateur.|Fotografiere mobil Belege oder Rechnungen. Dokumente bleiben in diesem Browser.|Da mobile, fotografa scontrini o fatture. I documenti restano in questo browser.|No celular, fotografe recibos ou faturas. Os documentos ficam neste navegador.|På mobilen kan du fotografera kvitton eller fakturor. Dokumenten stannar i den här webbläsaren.
Buscar y filtrar|Search and filter|Rechercher et filtrer|Suchen und filtern|Cerca e filtra|Buscar e filtrar|Sök och filtrera
Todos los tipos|All types|Tous les types|Alle Typen|Tutti i tipi|Todos os tipos|Alla typer
Todos los pagos|All payment methods|Tous les paiements|Alle Zahlungsarten|Tutti i pagamenti|Todos os pagamentos|Alla betalningssätt
Ordenar por fecha|Sort by date|Trier par date|Nach Datum sortieren|Ordina per data|Ordenar por data|Sortera efter datum
m.cfinova IA · Tu asistente financiero|m.cfinova AI · Your financial assistant|m.cfinova IA · Votre assistant financier|m.cfinova KI · Dein Finanzassistent|m.cfinova IA · Il tuo assistente finanziario|m.cfinova IA · Seu assistente financeiro|m.cfinova AI · Din ekonomiassistent
Escribe un movimiento o una consulta. El dictado puede enviar audio al servicio de reconocimiento de tu navegador. Revisa cada movimiento antes de guardarlo.|Type a transaction or question. Dictation may send audio to your browser’s speech service. Review each transaction before saving.|Saisissez une opération ou question. La dictée peut envoyer l’audio au service vocal du navigateur. Vérifiez avant d’enregistrer.|Schreibe eine Buchung oder Frage. Diktieren kann Audio an den Sprachdienst des Browsers senden. Prüfe vor dem Speichern.|Scrivi un movimento o una domanda. La dettatura può inviare audio al servizio vocale del browser. Controlla prima di salvare.|Digite um movimento ou pergunta. O ditado pode enviar áudio ao serviço de voz do navegador. Revise antes de salvar.|Skriv en transaktion eller fråga. Diktering kan skicka ljud till webbläsarens taltjänst. Granska innan du sparar.
Resumen de gastos del mes|Monthly expense overview|Bilan des dépenses du mois|Monatliche Ausgabenübersicht|Riepilogo spese del mese|Resumo de despesas do mês|Månadens utgiftsöversikt
Mis gastos del mes|My monthly expenses|Mes dépenses du mois|Meine Monatsausgaben|Le mie spese del mese|Minhas despesas do mês|Månadens utgifter
Consejos de ahorro|Savings tips|Conseils d’épargne|Spartipps|Consigli di risparmio|Dicas de poupança|Spartips
Mi balance|My balance|Mon solde|Mein Saldo|Il mio saldo|Meu saldo|Mitt saldo
Hablar|Speak|Parler|Sprechen|Parla|Falar|Tala
Consultar|Ask|Consulter|Fragen|Consulta|Consultar|Fråga
Analizar|Analyse|Analyser|Analysieren|Analizza|Analisar|Analysera
Puedes preguntar cuánto has gastado, cuánto tienes disponible o registrar un gasto.|Ask about spending, available money or record an expense.|Consultez vos dépenses, votre disponible ou enregistrez une dépense.|Frage nach Ausgaben und verfügbarem Geld oder erfasse eine Ausgabe.|Consulta spese, disponibilità o registra una spesa.|Consulte despesas, dinheiro disponível ou registre uma despesa.|Fråga om utgifter, tillgängliga pengar eller registrera en utgift.
Confirmar movimiento|Confirm transaction|Confirmer l’opération|Buchung bestätigen|Conferma movimento|Confirmar movimentação|Bekräfta transaktion
Confirmar y guardar|Confirm and save|Confirmer et enregistrer|Bestätigen und speichern|Conferma e salva|Confirmar e salvar|Bekräfta och spara
Plan de ahorro|Savings plan|Plan d’épargne|Sparplan|Piano di risparmio|Plano de poupança|Sparplan
Calcular|Calculate|Calculer|Berechnen|Calcola|Calcular|Beräkna
Copia de seguridad local|Local backup|Sauvegarde locale|Lokale Sicherung|Backup locale|Cópia de segurança local|Lokal säkerhetskopia
Exporta tus datos financieros a un archivo JSON o restaura una copia anterior. El archivo contiene información privada: guárdalo en un lugar seguro. No hay sincronización en la nube.|Export your finances as JSON or restore a backup. Keep this private file safe. There is no cloud sync.|Exportez vos finances en JSON ou restaurez une sauvegarde. Gardez ce fichier privé en sécurité. Pas de synchronisation cloud.|Finanzdaten als JSON exportieren oder Sicherung wiederherstellen. Private Datei sicher aufbewahren. Keine Cloud-Synchronisierung.|Esporta le finanze in JSON o ripristina un backup. Conserva il file privato al sicuro. Nessuna sincronizzazione cloud.|Exporte finanças em JSON ou restaure uma cópia. Guarde o arquivo privado com segurança. Sem sincronização na nuvem.|Exportera ekonomin som JSON eller återställ en kopia. Förvara den privata filen säkert. Ingen molnsynkronisering.
Descargar copia de seguridad|Download backup|Télécharger la sauvegarde|Sicherung herunterladen|Scarica backup|Baixar cópia de segurança|Ladda ner säkerhetskopia
Restaurar copia|Restore backup|Restaurer la sauvegarde|Sicherung wiederherstellen|Ripristina backup|Restaurar cópia|Återställ säkerhetskopia
Tus copias de seguridad|Your backups|Vos sauvegardes|Deine Sicherungen|I tuoi backup|Suas cópias de segurança|Dina säkerhetskopior
Descarga una copia de seguridad de tus datos o restaura una copia anterior. El archivo es privado y no se sube a ningún servidor.|Download a backup or restore an earlier one. The private file is not uploaded to any server.|Téléchargez ou restaurez une sauvegarde. Ce fichier privé n’est envoyé à aucun serveur.|Sicherung herunterladen oder wiederherstellen. Die private Datei wird nicht auf einen Server geladen.|Scarica o ripristina un backup. Il file privato non viene caricato su alcun server.|Baixe ou restaure uma cópia. O arquivo privado não é enviado a servidores.|Ladda ner eller återställ en säkerhetskopia. Den privata filen laddas inte upp till någon server.
Copia personal|Personal backup|Sauvegarde personnelle|Private Sicherung|Backup personale|Cópia pessoal|Privat säkerhetskopia
La copia se descarga como archivo JSON en tu dispositivo. Consérvala en un lugar seguro para poder restaurarla más adelante.|The backup downloads as JSON to your device. Keep it safe for later restoration.|La sauvegarde est téléchargée en JSON. Gardez-la en sécurité pour la restaurer plus tard.|Die Sicherung wird als JSON heruntergeladen. Bewahre sie für eine spätere Wiederherstellung sicher auf.|Il backup viene scaricato in JSON. Conservalo al sicuro per ripristinarlo in seguito.|A cópia é baixada em JSON. Guarde-a em segurança para restaurar depois.|Säkerhetskopian laddas ner som JSON. Förvara den säkert för senare återställning.
Puedes usar cualquier moneda y método de pago. Los datos se guardan en este navegador.|Use any currency and payment method. Data stays in this browser.|Utilisez toute devise et moyen de paiement. Les données restent dans ce navigateur.|Beliebige Währung und Zahlungsart nutzen. Daten bleiben in diesem Browser.|Usa qualsiasi valuta e pagamento. I dati restano in questo browser.|Use qualquer moeda e pagamento. Os dados ficam neste navegador.|Använd valfri valuta och betalningsmetod. Uppgifterna stannar i den här webbläsaren.
Guardar moneda|Save currency|Enregistrer la devise|Währung speichern|Salva valuta|Salvar moeda|Spara valuta
Borrar todos los datos|Delete all data|Effacer toutes les données|Alle Daten löschen|Elimina tutti i dati|Apagar todos os dados|Radera alla uppgifter
Copiar enlace|Copy link|Copier le lien|Link kopieren|Copia link|Copiar link|Kopiera länk
m.cfinova · Tu dinero, más claro.|m.cfinova · Your money, clearer.|m.cfinova · Votre argent, plus clair.|m.cfinova · Dein Geld, klarer.|m.cfinova · I tuoi soldi, più chiari.|m.cfinova · Seu dinheiro, mais claro.|m.cfinova · Dina pengar, tydligare.
Acerca de m.cfinova|About m.cfinova|À propos de m.cfinova|Über m.cfinova|Informazioni su m.cfinova|Sobre m.cfinova|Om m.cfinova
Guía de finanzas|Finance guide|Guide financier|Finanzratgeber|Guida finanziaria|Guia de finanças|Ekonomiguide
Ayuda|Help|Aide|Hilfe|Aiuto|Ajuda|Hjälp
Privacidad|Privacy|Confidentialité|Datenschutz|Privacy|Privacidade|Integritet
Herramienta de organización financiera; no es un banco ni asesoramiento financiero.|Financial organisation tool; not a bank or financial advice.|Outil d’organisation financière ; ni banque ni conseil financier.|Finanzorganisation; keine Bank oder Finanzberatung.|Strumento di organizzazione finanziaria; non banca né consulenza finanziaria.|Ferramenta de organização financeira; não é banco nem consultoria financeira.|Verktyg för ekonomisk planering; ingen bank eller finansiell rådgivning.
Crear cuenta|Create account|Créer un compte|Konto erstellen|Crea account|Criar conta|Skapa konto
Crea una cuenta para iniciar sesión. Por ahora, tus movimientos y documentos se guardan en este navegador y no se sincronizan entre dispositivos.|Create an account to sign in. Transactions and documents stay in this browser and do not sync across devices.|Créez un compte. Opérations et documents restent dans ce navigateur, sans synchronisation entre appareils.|Erstelle ein Konto. Buchungen und Dokumente bleiben in diesem Browser, ohne Gerätesynchronisierung.|Crea un account. Movimenti e documenti restano in questo browser, senza sincronizzazione tra dispositivi.|Crie uma conta. Movimentos e documentos ficam neste navegador, sem sincronização entre dispositivos.|Skapa ett konto. Transaktioner och dokument stannar i den här webbläsaren utan synkronisering mellan enheter.
Continuar|Continue|Continuer|Weiter|Continua|Continuar|Fortsätt
Consulta la|Read the|Consultez les|Lies die|Consulta le|Consulte as|Läs vår
información de privacidad|privacy information|informations de confidentialité|Datenschutzhinweise|informazioni sulla privacy|informações de privacidade|integritetsinformation
. Tu cuenta no sincroniza los datos financieros entre dispositivos.|. Your account does not sync financial data across devices.|. Votre compte ne synchronise pas les données entre appareils.|. Dein Konto synchronisiert keine Finanzdaten zwischen Geräten.|. L’account non sincronizza dati finanziari tra dispositivi.|. A conta não sincroniza dados financeiros entre dispositivos.|. Kontot synkroniserar inte ekonomiska uppgifter mellan enheter.
Política de privacidad|Privacy policy|Politique de confidentialité|Datenschutzrichtlinie|Informativa sulla privacy|Política de privacidade|Integritetspolicy
Pruebas de suscripción. No se realizan cobros reales.|Subscription tests. No real charges.|Tests d’abonnement. Aucun débit réel.|Abonnementtests. Keine echten Abbuchungen.|Test di abbonamento. Nessun addebito reale.|Testes de assinatura. Sem cobranças reais.|Prenumerationstester. Inga riktiga debiteringar.
Verificando disponibilidad…|Checking availability…|Vérification de la disponibilité…|Verfügbarkeit wird geprüft…|Verifica disponibilità…|Verificando disponibilidade…|Kontrollerar tillgänglighet…
Usa únicamente datos de pago de prueba de Stripe.|Only use Stripe test payment details.|Utilisez uniquement des moyens de paiement de test Stripe.|Nur Stripe-Testzahlungsdaten verwenden.|Usa solo dati di pagamento di prova Stripe.|Use apenas dados de pagamento de teste Stripe.|Använd endast Stripes testbetalningsuppgifter.
Premium · 4,99 € / mes|Premium · €4.99 / month|Premium · 4,99 € / mois|Premium · 4,99 € / Monat|Premium · 4,99 € / mese|Premium · 4,99 € / mês|Premium · 4,99 € / månad
Premium · 49,99 € / año|Premium · €49.99 / year|Premium · 49,99 € / an|Premium · 49,99 € / Jahr|Premium · 49,99 € / anno|Premium · 49,99 € / ano|Premium · 49,99 € / år
Pro · 8,99 € / mes|Pro · €8.99 / month|Pro · 8,99 € / mois|Pro · 8,99 € / Monat|Pro · 8,99 € / mese|Pro · 8,99 € / mês|Pro · 8,99 € / månad
Pro · 89,99 € / año|Pro · €89.99 / year|Pro · 89,99 € / an|Pro · 89,99 € / Jahr|Pro · 89,99 € / anno|Pro · 89,99 € / ano|Pro · 89,99 € / år
Gestionar o cancelar suscripción|Manage or cancel subscription|Gérer ou résilier l’abonnement|Abonnement verwalten oder kündigen|Gestisci o annulla abbonamento|Gerenciar ou cancelar assinatura|Hantera eller avsluta prenumeration
Verificar mi plan|Check my plan|Vérifier mon offre|Meinen Tarif prüfen|Verifica il mio piano|Verificar meu plano|Kontrollera min plan
La versión gratuita sigue disponible. Tus datos financieros se guardan en este navegador.|The free version remains available. Your financial data stays in this browser.|La version gratuite reste disponible. Vos données restent dans ce navigateur.|Die kostenlose Version bleibt verfügbar. Finanzdaten bleiben in diesem Browser.|La versione gratuita resta disponibile. I dati rimangono in questo browser.|A versão gratuita continua disponível. Seus dados ficam neste navegador.|Gratisversionen finns kvar. Dina ekonomiska uppgifter stannar i den här webbläsaren.
Cámara|Camera|Caméra|Kamera|Fotocamera|Câmera|Kamera
Tomar foto|Take photo|Prendre une photo|Foto aufnehmen|Scatta foto|Tirar foto|Ta foto
Cerrar cámara|Close camera|Fermer la caméra|Kamera schließen|Chiudi fotocamera|Fechar câmera|Stäng kameran
Detener dictado|Stop dictation|Arrêter la dictée|Diktieren beenden|Interrompi dettatura|Parar ditado|Stoppa diktering
Concepto (p. ej., venta diaria)|Description (e.g. daily sales)|Libellé (ex. ventes du jour)|Beschreibung (z. B. Tagesumsatz)|Descrizione (es. vendite giornaliere)|Descrição (ex.: vendas do dia)|Beskrivning (t.ex. dagsförsäljning)
Nombre / banco|Name / bank|Nom / banque|Name / Bank|Nome / banca|Nome / banco|Namn / bank
Deuda total|Total debt|Dette totale|Gesamtschuld|Debito totale|Dívida total|Total skuld
Pagado|Paid|Remboursé|Bezahlt|Pagato|Pago|Betalat
Cuota mensual|Monthly payment|Mensualité|Monatliche Rate|Rata mensile|Parcela mensal|Månadsbetalning
Factura (luz, alquiler…)|Bill (electricity, rent…)|Facture (électricité, loyer…)|Rechnung (Strom, Miete…)|Fattura (luce, affitto…)|Fatura (luz, aluguel…)|Faktura (el, hyra…)
Nombre del documento|Document name|Nom du document|Dokumentname|Nome documento|Nome do documento|Dokumentnamn
Tipo de gasto / categoría|Expense type / category|Type de dépense / catégorie|Ausgabenart / Kategorie|Tipo di spesa / categoria|Tipo de despesa / categoria|Utgiftstyp / kategori
Comercio / concepto|Merchant / description|Commerce / libellé|Händler / Beschreibung|Negozio / descrizione|Comércio / descrição|Butik / beskrivning
Buscar por nombre…|Search by name…|Rechercher par nom…|Nach Namen suchen…|Cerca per nome…|Buscar por nome…|Sök efter namn…
Ejemplo: Gasté 35 euros en alimentación ayer|Example: I spent 35 euros on food yesterday|Exemple : J’ai dépensé 35 euros en nourriture hier|Beispiel: Ich habe gestern 35 Euro für Essen ausgegeben|Esempio: Ho speso 35 euro per alimenti ieri|Exemplo: Gastei 35 euros em alimentação ontem|Exempel: Jag betalade 35 euro för mat igår
Objetivo (€)|Goal (€)|Objectif (€)|Ziel (€)|Obiettivo (€)|Meta (€)|Mål (€)
Ya ahorrado (€)|Already saved (€)|Déjà épargné (€)|Bereits gespart (€)|Già risparmiato (€)|Já poupado (€)|Redan sparat (€)
Meses|Months|Mois|Monate|Mesi|Meses|Månader
Símbolo moneda|Currency symbol|Symbole monétaire|Währungssymbol|Simbolo valuta|Símbolo da moeda|Valutasymbol
Nombre|Name|Nom|Name|Nome|Nome|Namn
Correo electrónico|Email|E-mail|E-Mail|Email|E-mail|E-post
Contraseña|Password|Mot de passe|Passwort|Password|Senha|Lösenord
Cerrar|Close|Fermer|Schließen|Chiudi|Fechar|Stäng
No hay pagos pendientes.|No pending payments.|Aucun paiement en attente.|Keine offenen Zahlungen.|Nessun pagamento in sospeso.|Nenhum pagamento pendente.|Inga väntande betalningar.
Sin préstamos registrados.|No loans recorded.|Aucun prêt enregistré.|Keine Kredite erfasst.|Nessun prestito registrato.|Nenhum empréstimo registrado.|Inga registrerade lån.
Sin facturas registradas.|No bills recorded.|Aucune facture enregistrée.|Keine Rechnungen erfasst.|Nessuna fattura registrata.|Nenhuma fatura registrada.|Inga registrerade fakturor.
Todavía no hay movimientos.|No transactions yet.|Aucune opération pour le moment.|Noch keine Buchungen.|Nessun movimento ancora.|Ainda não há movimentações.|Inga transaktioner ännu.
Sin movimientos|No transactions|Aucune opération|Keine Buchungen|Nessun movimento|Sem movimentações|Inga transaktioner
Tus últimos movimientos aparecerán aquí.|Your latest transactions will appear here.|Vos dernières opérations apparaîtront ici.|Deine letzten Buchungen erscheinen hier.|I tuoi ultimi movimenti appariranno qui.|Suas últimas movimentações aparecerão aqui.|Dina senaste transaktioner visas här.
No hay facturas pendientes.|No unpaid bills.|Aucune facture en attente.|Keine offenen Rechnungen.|Nessuna fattura in sospeso.|Nenhuma fatura pendente.|Inga obetalda fakturor.
Registra gastos para ver tus categorías.|Record expenses to see your categories.|Enregistrez des dépenses pour voir vos catégories.|Erfasse Ausgaben, um Kategorien zu sehen.|Registra spese per vedere le categorie.|Registre despesas para ver as categorias.|Registrera utgifter för att se kategorier.
No hay documentos que coincidan con los filtros.|No documents match the filters.|Aucun document ne correspond aux filtres.|Keine Dokumente entsprechen den Filtern.|Nessun documento corrisponde ai filtri.|Nenhum documento corresponde aos filtros.|Inga dokument matchar filtren.`;
const extra=[['Tu cuenta no sincroniza los datos financieros entre dispositivos.','Your account does not sync financial data across devices.','Votre compte ne synchronise pas les données entre appareils.','Dein Konto synchronisiert keine Finanzdaten zwischen Geräten.','L’account non sincronizza dati finanziari tra dispositivi.','A conta não sincroniza dados financeiros entre dispositivos.','Kontot synkroniserar inte ekonomiska uppgifter mellan enheter.']];
const langs=['es','en','fr','de','it','pt','sv'],dict=Object.fromEntries(langs.map(x=>[x,{}]));
for(const row of [...rows.split('\n'),...extra.map(x=>x.join('|'))]){const parts=row.split('|');if(parts.length!==7)throw Error('Invalid translation: '+parts[0]);langs.forEach((l,i)=>dict[l][parts[0]]=parts[i])}
const source=new WeakMap(),attrs=new WeakMap();let current='es',busy=false;
function translate(value){const raw=String(value),trim=raw.trim(),prefix=trim.match(/^[^\p{L}\p{N}¿¡]+/u)?.[0]||'',key=trim.slice(prefix.length),out=dict[current][key];return out===undefined?raw:raw.replace(trim,prefix+out)}
function apply(){if(busy||!document?.body)return;busy=true;observer?.disconnect();
 try{
 const walker=document.createTreeWalker(document.body,NodeFilter.SHOW_TEXT);let node;
 while(node=walker.nextNode()){
  if(node.parentElement.closest('script,style,#lang,[data-no-translate]'))continue;
  const saved=source.get(node),original=saved&&saved.last===node.nodeValue?saved.original:node.nodeValue;
  const out=translate(original);source.set(node,{original,last:out});if(node.nodeValue!==out)node.nodeValue=out;
 }
 for(const el of document.querySelectorAll('[placeholder],[aria-label],[title]')){
  const map=attrs.get(el)||{};
  for(const attr of ['placeholder','aria-label','title']){if(!el.hasAttribute(attr))continue;const val=el.getAttribute(attr),old=map[attr],original=old&&old.last===val?old.original:val,out=translate(original);map[attr]={original,last:out};if(out!==val)el.setAttribute(attr,out)}attrs.set(el,map);
 }
 document.documentElement.lang=current;document.title='m.cfinova · '+dict[current]['Tu dinero, más claro.'];
 }finally{busy=false;observer?.observe(document.body,{childList:true,subtree:true,characterData:true})}
}
const observer=new MutationObserver(()=>apply());window.addEventListener('pagehide',()=>observer.disconnect());
window.FinovaI18n={dict,langs,tr:translate,apply,get language(){return current}};
window.setLang=function(){current=langs.includes(document.getElementById('lang').value)?document.getElementById('lang').value:'es';localStorage.setItem('finova_language',current);apply();window.dispatchEvent(new Event('finova:language'))};
const saved=localStorage.getItem('finova_language');if(langs.includes(saved))document.getElementById('lang').value=saved;window.setLang();
})();
