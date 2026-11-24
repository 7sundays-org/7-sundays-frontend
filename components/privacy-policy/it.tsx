import { COMPANY } from "@/lib/company";

const mail = <a href={`mailto:${COMPANY.email}`}>{COMPANY.email}</a>;

/**
 * Italian privacy policy text. Draft to be reviewed by 7Sundays' legal
 * counsel: replace with the approved version when it comes back.
 */
export function PrivacyPolicyIt() {
  return (
    <>
      <p>
        Questa informativa descrive come trattiamo i dati personali di chi
        visita il sito 7sundays.it e di chi ci contatta tramite i moduli
        presenti sul sito, ai sensi dell&apos;art. 13 del Regolamento (UE)
        2016/679 (&quot;GDPR&quot;) e del D.Lgs. 196/2003, come modificato dal
        D.Lgs. 101/2018 (&quot;Codice Privacy&quot;).
      </p>

      <section>
        <h2>1. Titolare del trattamento</h2>
        <p>
          Il titolare del trattamento è <strong>{COMPANY.name}</strong>, con
          sede legale in {COMPANY.address}, P.IVA {COMPANY.vatNumber} (di
          seguito &quot;7Sundays&quot; o &quot;noi&quot;). Per qualsiasi
          richiesta sui tuoi dati personali puoi scriverci a {mail}.
        </p>
      </section>

      <section>
        <h2>2. Quali dati trattiamo</h2>
        <p>
          <strong>Dati di navigazione.</strong> I sistemi che fanno funzionare
          il sito acquisiscono automaticamente alcuni dati la cui trasmissione è
          implicita nell&apos;uso dei protocolli di Internet, come
          l&apos;indirizzo IP, il tipo di browser e di dispositivo, la data e
          l&apos;ora della richiesta e la pagina richiesta. Questi dati servono
          a erogare il sito e a garantirne la sicurezza e non vengono usati per
          profilarti.
        </p>
        <p>
          <strong>Dati che ci fornisci tramite i moduli.</strong> Quando compili
          uno dei moduli di contatto raccogliamo il tuo nome (e cognome), il tuo
          indirizzo email e le altre informazioni richieste dal modulo (i campi
          contrassegnati con * sono obbligatori), che variano a seconda del
          modulo:
        </p>
        <ul>
          <li>
            <strong>Contatti:</strong> il tuo messaggio;
          </li>
          <li>
            <strong>Proprietari:</strong> città e zona dell&apos;immobile,
            tipologia, metratura, numero di posti letto, link a una cartella di
            foto (ad esempio WeTransfer o Google Drive) e il tuo messaggio;
          </li>
          <li>
            <strong>Soggiorni:</strong> città o zona di interesse, date, numero
            di persone, tipo di alloggio, motivo del soggiorno ed eventuali
            richieste particolari;
          </li>
          <li>
            <strong>Property Manager:</strong> tipo di consulenza di interesse,
            obiettivo principale e descrizione della tua situazione;
          </li>
          <li>
            <strong>About:</strong> il tuo profilo (proprietario, ospite o
            altro) e il tuo messaggio.
          </li>
        </ul>
        <p>
          Se ci invii un link a WeTransfer, Google Drive o servizi simili,
          consultiamo le foto per valutare il tuo immobile. Il servizio che hai
          scelto tratta i dati secondo le condizioni che hai accettato con il
          relativo fornitore. Ti chiediamo di non includere nelle foto persone
          riconoscibili o documenti.
        </p>
        <p>
          <strong>Dati che ci invii direttamente.</strong> Se ci scrivi via
          email o ci chiami ai recapiti indicati sul sito, trattiamo i dati
          contenuti nella tua comunicazione.
        </p>
        <p>
          Non inserire nei moduli dati appartenenti a categorie particolari
          (art. 9 GDPR), come informazioni sulla salute o su una disabilità. Se
          per organizzare il soggiorno ci servono informazioni di questo tipo
          (ad esempio esigenze di accessibilità), te le chiederemo separatamente
          con il tuo consenso esplicito (art. 9, par. 2, lett. a GDPR). Se ce le
          invii comunque, le cancelleremo senza utilizzarle.
        </p>
      </section>

      <section>
        <h2>3. Perché trattiamo i dati e su quale base giuridica</h2>
        <ul>
          <li>
            <strong>Rispondere alle tue richieste</strong> e darti informazioni
            sui nostri servizi. Se la richiesta riguarda un servizio che
            desideri ricevere (gestione del tuo immobile, un soggiorno, una
            consulenza), la base giuridica è l&apos;esecuzione di misure
            precontrattuali adottate su tua richiesta (art. 6, par. 1, lett. b
            GDPR). Negli altri casi, ad esempio se ci scrivi per conto di
            un&apos;azienda o per altre richieste, la base giuridica è il nostro
            legittimo interesse a rispondere a chi ci contatta (art. 6, par. 1,
            lett. f GDPR).
          </li>
          <li>
            <strong>Erogare il sito e garantirne la sicurezza</strong>: la base
            giuridica è il nostro legittimo interesse a mantenere il sito
            funzionante e protetto (art. 6, par. 1, lett. f GDPR).
          </li>
          <li>
            <strong>Adempiere a obblighi di legge</strong> e, se necessario,
            accertare, esercitare o difendere un nostro diritto in sede
            giudiziaria: la base giuridica è l&apos;obbligo di legge (art. 6,
            par. 1, lett. c GDPR) e il nostro legittimo interesse (art. 6, par.
            1, lett. f GDPR).
          </li>
        </ul>
        <p>
          Non usiamo i tuoi dati per inviarti comunicazioni promozionali o
          newsletter, non li vendiamo e non li sottoponiamo a profilazione né a
          decisioni basate unicamente su un trattamento automatizzato.
        </p>
      </section>

      <section>
        <h2>4. Obbligo di fornire i dati</h2>
        <p>
          Fornire i dati tramite i moduli è facoltativo. I campi contrassegnati
          con l&apos;asterisco (*) sono però necessari per rispondere alla tua
          richiesta: senza di essi non possiamo darle seguito.
        </p>
      </section>

      <section>
        <h2>5. Come trattiamo i dati</h2>
        <p>
          I dati sono trattati con strumenti elettronici, da persone autorizzate
          e con misure tecniche e organizzative adeguate a proteggerli da
          accessi non autorizzati, perdita o divulgazione. Il sito è servito
          esclusivamente tramite connessione cifrata (HTTPS).
        </p>
      </section>

      <section>
        <h2>6. A chi comunichiamo i dati</h2>
        <p>
          Possono accedere ai tuoi dati le persone di 7Sundays autorizzate al
          trattamento e i seguenti fornitori, che li trattano per nostro conto
          come responsabili del trattamento (art. 28 GDPR):
        </p>
        <ul>
          <li>
            <strong>Vercel Inc.</strong> (Stati Uniti): hosting del sito ed
            elaborazione dei messaggi inviati tramite i moduli;
          </li>
          <li>
            <strong>Resend</strong> (Stati Uniti): inoltro via email dei
            messaggi ricevuti tramite i moduli;
          </li>
          <li>
            <strong>Google</strong>: posta elettronica, che riceve i messaggi
            dei moduli e le email inviate a {COMPANY.email};
          </li>
          <li>
            <strong>Prismic</strong>: gestione dei contenuti del sito. Le
            immagini sono distribuite tramite reti di distribuzione dei
            contenuti (CDN) gestite da suoi sub-fornitori, tra cui Amazon Web
            Services e imgix (Stati Uniti), che ricevono l&apos;indirizzo IP del
            visitatore;
          </li>
          <li>
            l&apos;agenzia che cura lo sviluppo e la manutenzione tecnica del
            sito (Italia).
          </li>
        </ul>
        <p>
          Se dalla richiesta nasce un rapporto contrattuale, i dati possono
          essere comunicati anche a consulenti e professionisti (ad esempio
          commercialista e legali). I dati non sono diffusi né ceduti a terzi
          per loro finalità e possono essere comunicati alle autorità competenti
          solo quando lo richiede la legge.
        </p>
      </section>

      <section>
        <h2>7. Trasferimento dei dati fuori dallo Spazio economico europeo</h2>
        <p>
          Vercel, Resend e Google, nonché Amazon Web Services e imgix
          (sub-fornitori di Prismic), sono società con sede negli Stati Uniti o
          vi trattano i dati. Il trasferimento si basa sulla decisione di
          adeguatezza della Commissione europea relativa all&apos;EU-U.S. Data
          Privacy Framework (Decisione di esecuzione (UE) 2023/1795 del 10
          luglio 2023), a cui questi fornitori aderiscono, e sulle clausole
          contrattuali standard approvate dalla Commissione (art. 46, par. 2,
          lett. c GDPR) previste dai rispettivi accordi sul trattamento dei
          dati. Puoi ottenere copia delle clausole contrattuali standard
          scrivendo a {mail}.
        </p>
      </section>

      <section>
        <h2>8. Per quanto tempo conserviamo i dati</h2>
        <ul>
          <li>
            <strong>Dati di navigazione:</strong> conservati nei log tecnici del
            fornitore di hosting per non più di 30 giorni e dalle reti di
            distribuzione delle immagini secondo i rispettivi tempi tecnici,
            salvo che servano ad accertare abusi o illeciti;
          </li>
          <li>
            <strong>Dati inviati tramite i moduli o via email:</strong> per il
            tempo necessario a gestire la tua richiesta e comunque non oltre 12
            mesi dall&apos;ultimo contatto. Una copia tecnica dei messaggi dei
            moduli è conservata dal servizio di invio (Resend) per non più di 30
            giorni. Se dalla richiesta nasce un rapporto contrattuale, riceverai
            un&apos;informativa specifica e i dati saranno conservati per la
            durata del rapporto e, dopo la sua conclusione, per il periodo
            previsto dalla legge (ad esempio 10 anni per la documentazione
            contabile e fiscale).
          </li>
        </ul>
        <p>
          Trascorsi questi periodi, i dati vengono cancellati o resi anonimi.
        </p>
      </section>

      <section>
        <h2>9. Cookie</h2>
        <p>
          Il sito non installa cookie e non memorizza informazioni sul tuo
          dispositivo (ad esempio tramite localStorage), né usa strumenti di
          analisi statistica o di profilazione, propri o di terze parti. Non è
          quindi richiesto il tuo consenso (art. 122 del Codice Privacy; Linee
          guida del Garante del 10 giugno 2021) e il sito non mostra un banner
          per i cookie. Se introdurremo strumenti diversi, aggiorneremo questa
          informativa e, dove necessario, ti chiederemo il consenso.
        </p>
        <p>
          I link ai nostri profili social (ad esempio Instagram e TikTok) e alle
          recensioni pubblicate su piattaforme di terzi (Google, Airbnb,
          Booking.com) sono semplici collegamenti: nessun contenuto di queste
          piattaforme viene caricato sul sito finché non li apri. Una volta
          sulla piattaforma, si applica la sua informativa privacy.
        </p>
      </section>

      <section>
        <h2>10. I tuoi diritti</h2>
        <p>
          In qualsiasi momento e gratuitamente puoi esercitare, nei limiti e
          alle condizioni previsti dal GDPR, i diritti degli artt. 15-22 GDPR.
          In particolare puoi:
        </p>
        <ul>
          <li>accedere ai tuoi dati e ottenerne una copia;</li>
          <li>chiederne la rettifica o l&apos;integrazione;</li>
          <li>chiederne la cancellazione;</li>
          <li>chiedere la limitazione del trattamento;</li>
          <li>
            ricevere i dati in un formato strutturato e di uso comune e
            trasmetterli a un altro titolare (portabilità).
          </li>
        </ul>
        <p>
          <strong>Diritto di opposizione.</strong> Puoi opporti in qualsiasi
          momento, per motivi connessi alla tua situazione particolare, al
          trattamento basato sul nostro legittimo interesse (art. 21 GDPR).
        </p>
        <p>
          Se un trattamento si basa sul tuo consenso, puoi revocarlo in
          qualsiasi momento, senza pregiudicare la liceità del trattamento
          effettuato prima della revoca.
        </p>
        <p>
          Per esercitare i tuoi diritti scrivi a {mail}. Ti risponderemo senza
          ingiustificato ritardo e comunque entro un mese dalla richiesta,
          termine prorogabile di due mesi nei casi previsti dall&apos;art. 12,
          par. 3 GDPR.
        </p>
        <p>
          Se ritieni che il trattamento dei tuoi dati violi la normativa, puoi
          proporre reclamo al Garante per la protezione dei dati personali (
          <a
            href="https://www.garanteprivacy.it"
            target="_blank"
            rel="noreferrer"
          >
            www.garanteprivacy.it
          </a>
          ) o all&apos;autorità di controllo dello Stato membro UE in cui
          risiedi abitualmente, lavori o in cui è avvenuta la presunta
          violazione (art. 77 GDPR).
        </p>
      </section>

      <section>
        <h2>11. Modifiche a questa informativa</h2>
        <p>
          Potremo aggiornare questa informativa, ad esempio se aggiungiamo nuovi
          servizi al sito. La versione in vigore è sempre pubblicata su questa
          pagina, con la data dell&apos;ultimo aggiornamento.
        </p>
      </section>
    </>
  );
}
