/**
 * @file lib/artists.ts
 * @description Artist data and types for THE ELECTRONIC MUSIC BOOK
 *
 * COMPLETE ARTIST DATABASE - 503 Artists
 * Last updated: 2025-12-24
 *
 * EDITING GUIDE FOR NON-TECHNICAL USERS:
 * - Artist names should be exactly as they appear in the book
 * - Use the artist's professional/stage name
 * - IDs are auto-generated slugs (lowercase, hyphenated)
 * - Maintain alphabetical order when adding new artists
 * - Check for duplicates before adding
 */

// ============================================
// TYPE DEFINITIONS
// ============================================

/**
 * Represents an artist featured in THE ELECTRONIC MUSIC BOOK
 */
export interface Artist {
  /** URL-safe identifier (slug) generated from artist name */
  id: string;

  /** Artist's professional/stage name */
  name: string;

  // Future-ready optional fields
  /** Artist's real name (optional) */
  real_name?: string;

  /** Wikipedia or official bio URL (optional) */
  bio_url?: string;

  /** Genres associated with the artist (optional) */
  genres?: string[];

  /** Years active (optional) */
  years_active?: {
    start: number;
    end?: number;
  };

  /** Country of origin (optional) */
  country?: string;

  /** Discogs artist ID for future integration (optional) */
  discogs_id?: string;

  /** Spotify artist ID for future integration (optional) */
  spotify_id?: string;

  /** Page number(s) where artist appears in the book (optional) */
  page_references?: number[];

  /** Additional metadata (optional) */
  metadata?: Record<string, any>;
}

// ============================================
// ARTIST DATA
// ============================================

/**
 * Complete list of 503 electronic music artists from THE ELECTRONIC MUSIC BOOK
 * Alphabetically sorted A-Z
 */
export const artists: Artist[] = [
  { id: '8-kays', name: '8 Kays' },
  { id: 'above-and-beyond', name: 'Above & Beyond' },
  { id: 'acid-pauli', name: 'Acid Pauli' },
  { id: 'adam-beyer', name: 'Adam Beyer' },
  { id: 'adam-ten', name: 'Adam Ten' },
  { id: 'adana-twins', name: 'Adana Twins' },
  { id: 'adriatique', name: 'Adriatique' },
  { id: 'affkt', name: 'AFFKT' },
  { id: 'afshin-momadi', name: 'Afshin Momadi' },
  { id: 'agents-of-time', name: 'Agents of Time' },
  { id: 'agoria', name: 'Agoria' },
  { id: 'aikon', name: 'Aikon' },
  { id: 'alesso', name: 'Alesso' },
  { id: 'alican', name: 'Alican' },
  { id: 'allen-husley', name: 'Allen Husley' },
  { id: 'ame', name: 'Ame' },
  { id: 'ameme', name: 'Ameme' },
  { id: 'amine-k', name: 'Amine K' },
  { id: 'andhim', name: 'Andhim' },
  { id: 'andy-bros', name: 'Andy Bros' },
  { id: 'andy-martin', name: 'Andy Martin' },
  { id: 'anfisa-letyago', name: 'Anfisa Letyago' },
  { id: 'angelos', name: 'Angelos' },
  { id: 'anja-schneider', name: 'Anja Schneider' },
  { id: 'ann-clue', name: 'Ann Clue' },
  { id: 'anna', name: 'ANNA' },
  { id: 'anna-tur', name: 'Anna Tur' },
  { id: 'anotr', name: 'Anotr' },
  { id: 'anstascia', name: 'Anstascia' },
  { id: 'anthony-middleton', name: 'Anthony Middleton' },
  { id: 'apollonia', name: 'Apollonia' },
  { id: 'archie-hamilton', name: 'Archie Hamilton' },
  { id: 'argy', name: 'Argy' },
  { id: 'armand-van-helden', name: 'Armand Van Helden' },
  { id: 'armen-miran', name: 'Armen Miran' },
  { id: 'armin-van-buuren', name: 'Armin Van Buuren' },
  { id: 'arodes', name: 'Arodes' },
  { id: 'art-department-kenny-glasgow', name: 'Art Department /Kenny Glasgow' },
  { id: 'artbat', name: 'Artbat' },
  { id: 'asaf-samuel', name: 'Asaf Samuel' },
  { id: 'ash', name: 'Ash' },
  { id: 'atish', name: 'Atish' },
  { id: 'avangart-tabldot', name: 'Avangart Tabldot' },
  { id: 'avicci', name: 'Avicci' },
  { id: 'avision', name: 'Avision' },
  { id: 'awen', name: 'Awen' },
  { id: 'b-jones', name: 'B Jones' },
  { id: 'baime', name: 'Baime' },
  { id: 'bakean', name: 'Bakean' },
  { id: 'bantwanas', name: 'Bantwanas' },
  { id: 'baron', name: 'Baron' },
  { id: 'bart-skils', name: 'Bart Skils' },
  { id: 'bartolomeo', name: 'Bartolomeo' },
  { id: 'bec', name: 'BEC' },
  { id: 'bedouin', name: 'Bedouin' },
  { id: 'ben-bohmer', name: 'Ben Böhmer' },
  { id: 'ben-klock', name: 'Ben Klock' },
  { id: 'ben-sterling', name: 'Ben Sterling' },
  { id: 'benjamin-frohlich', name: 'Benjamin Fröhlich' },
  { id: 'biesmans', name: 'Biesmans' },
  { id: 'birds-of-mind', name: 'Birds of Mind' },
  { id: 'black-coffee', name: 'Black Coffee' },
  { id: 'blondish', name: 'Blondish' },
  { id: 'bob-moses', name: 'Bob Moses' },
  { id: 'booka-shade', name: 'Booka Shade' },
  { id: 'bora-uzer', name: 'Bora Uzer' },
  { id: 'boris-brejcha', name: 'Boris Brejcha' },
  { id: 'brina-knauss', name: 'Brina Knauss' },
  { id: 'britta-arnold', name: 'Britta Arnold' },
  { id: 'byron-the-aquarius', name: 'Byron The Aquarius' },
  { id: 'cabizbajo', name: 'Cabizbajo' },
  { id: 'calvin-harris', name: 'Calvin Harris' },
  { id: 'camel-phat', name: 'Camel Phat' },
  { id: 'caribou', name: 'Caribou' },
  { id: 'carl-cox', name: 'Carl Cox' },
  { id: 'carl-craig', name: 'Carl Craig' },
  { id: 'carlita', name: 'Carlita' },
  { id: 'carmel', name: 'Carmel' },
  { id: 'carnage', name: 'Carnage' },
  { id: 'cassian', name: 'Cassian' },
  { id: 'chaim', name: 'Chaim' },
  { id: 'chambord', name: 'Chambord' },
  { id: 'charlotte-de-witte', name: 'Charlotte De Witte' },
  { id: 'chelina-manuhutu', name: 'Chelina Manuhutu' },
  { id: 'chloe-caillet', name: 'Chloé Caillet' },
  { id: 'chris-lake', name: 'Chris Lake' },
  { id: 'chris-liebing', name: 'Chris Liebing' },
  { id: 'chris-schwarzwalder', name: 'Chris Schwarzwälder' },
  { id: 'chris-stussy', name: 'Chris Stussy' },
  { id: 'christian-loffler', name: 'Christian Löffler' },
  { id: 'chus', name: 'Chus' },
  { id: 'cincity', name: 'CinCity' },
  { id: 'cipy', name: 'Cipy' },
  { id: 'claptone', name: 'Claptone' },
  { id: 'cloonee', name: 'Cloonee' },
  { id: 'colle', name: 'Collé' },
  { id: 'colossio', name: 'Colossio' },
  { id: 'colyn', name: 'Colyn' },
  { id: 'cosmic-gate', name: 'Cosmic Gate' },
  { id: 'cristoph', name: 'Cristoph' },
  { id: 'curol', name: 'Curol' },
  { id: 'damian-lazarus', name: 'Damian Lazarus' },
  { id: 'damon-jee', name: 'Damon Jee' },
  { id: 'danny-daze', name: 'Danny Daze' },
  { id: 'danny-howells', name: 'Danny Howells' },
  { id: 'danny-tenaglia', name: 'Danny Tenaglia' },
  { id: 'dark-entries-josh-cheon', name: 'Dark Entries /Josh Cheon' },
  { id: 'darren-emerson', name: 'Darren Emerson' },
  { id: 'dave-clarke', name: 'Dave Clarke' },
  { id: 'dave-seaman', name: 'Dave Seaman' },
  { id: 'davi', name: 'Davi' },
  { id: 'david-guetta', name: 'David Guetta' },
  { id: 'david-morales', name: 'David Morales' },
  { id: 'deadmau-5', name: 'Deadmau 5' },
  { id: 'debora-de-luca', name: 'Debora De Luca' },
  { id: 'deep-dish', name: 'Deep Dish' },
  { id: 'deer-jade', name: 'Deer Jade' },
  { id: 'denesh-tot', name: 'Denesh Tot' },
  { id: 'denis-horvat', name: 'Denis Horvat' },
  { id: 'dennis-cruz', name: 'Dennis Cruz' },
  { id: 'derrick-may', name: 'Derrick May' },
  { id: 'desiree', name: 'Desiree' },
  { id: 'dimitri-from-amsterdam', name: 'Dimitri from Amsterdam' },
  { id: 'dimitri-vegas-and-like-mike', name: 'Dimitri Vegas & Like Mike' },
  { id: 'diplo', name: 'Diplo' },
  { id: 'discolsure', name: 'Discolsure' },
  { id: 'dixon', name: 'Dixon' },
  { id: 'dj-bone', name: 'DJ Bone' },
  { id: 'dj-deep', name: 'DJ Deep' },
  { id: 'dj-gregory', name: 'DJ Gregory' },
  { id: 'dj-hell', name: 'DJ Hell' },
  { id: 'dj-holographic', name: 'DJ Holographic' },
  { id: 'dj-koze', name: 'DJ Koze' },
  { id: 'dj-mike', name: 'DJ Mike' },
  { id: 'dj-minx', name: 'DJ Minx' },
  { id: 'dj-pierre', name: 'DJ Pierre' },
  { id: 'dj-rush', name: 'DJ Rush' },
  { id: 'dj-tennis', name: 'DJ Tennis' },
  { id: 'dj-three', name: 'DJ Three' },
  { id: 'doctor-dru', name: 'Doctor Dru' },
  { id: 'dodi-palese', name: 'Dodi Palese' },
  { id: 'dop', name: 'DOP' },
  { id: 'dorian-craft', name: 'Dorian Craft' },
  { id: 'dubfire', name: 'Dubfire' },
  { id: 'duke-demont', name: 'Duke Demont' },
  { id: 'eagles-and-butterflies', name: 'Eagles & Butterflies' },
  { id: 'echonomist', name: 'Echonomist' },
  { id: 'eelke-kleijn', name: 'Eelke Kleijn' },
  { id: 'eli-and-fur', name: 'Eli & Fur' },
  { id: 'eli-iwasa', name: 'Eli Iwasa' },
  { id: 'elif', name: 'Elif' },
  { id: 'ellen-alien', name: 'Ellen Alien' },
  { id: 'emanuel-satie', name: 'Emanuel Satie' },
  { id: 'enzo-elia', name: 'Enzo Elia' },
  { id: 'erick-duncan', name: 'Erick Duncan' },
  { id: 'erick-morillo', name: 'Erick Morillo' },
  { id: 'erick-prydz', name: 'Erick Prydz' },
  { id: 'es-mestiza', name: 'Es Mëstiza' },
  { id: 'fantastic-twins', name: 'Fantastic Twins' },
  { id: 'fatboy-slim', name: 'Fatboy Slim' },
  { id: 'fatima', name: 'Fatima' },
  { id: 'fedde-le-grand', name: 'Fedde Le Grand' },
  { id: 'fedele', name: 'Fedele' },
  { id: 'felix-raphael', name: 'Felix Raphael' },
  { id: 'ferry-corsten', name: 'Ferry Corsten' },
  { id: 'fideles', name: 'Fideles' },
  { id: 'fiona-kraft', name: 'Fiona Kraft' },
  { id: 'fjaak', name: 'Fjaak' },
  { id: 'flashmob', name: 'Flashmob' },
  { id: 'floyd-lavine', name: 'Floyd Lavine' },
  { id: 'folamour', name: 'Folamour' },
  { id: 'franc-fala', name: 'Franc Fala' },
  { id: 'francesca-lombardo', name: 'Francesca Lombardo' },
  { id: 'francis-mercier', name: 'Francis Mercier' },
  { id: 'frank-storm', name: 'Frank Storm' },
  { id: 'frank-wiedemann', name: 'Frank Wiedemann' },
  { id: 'franz-scala', name: 'Franz Scala' },
  { id: 'freedom-fighters', name: 'Freedom Fighters' },
  { id: 'french-79', name: 'French 79' },
  { id: 'funk-tribu', name: 'Funk Tribu' },
  { id: 'furcoat', name: 'Furcoat' },
  { id: 'gauthier-dm', name: 'Gauthier DM' },
  { id: 'gerd-janson', name: 'Gerd Janson' },
  { id: 'giorgia-angiuli', name: 'Giorgia Angiuli' },
  { id: 'glauco-di-mambro', name: 'Glauco di Mambro' },
  { id: 'gnmr', name: 'GNMR' },
  { id: 'gordo', name: 'Gordo' },
  { id: 'gorje-hewek', name: 'Gorje Hewek' },
  { id: 'green-velvet', name: 'Green Velvet' },
  { id: 'greta-levska', name: 'Greta Levska' },
  { id: 'gus-gus', name: 'Gus Gus' },
  { id: 'guy-gerber', name: 'Guy Gerber' },
  { id: 'guy-j', name: 'Guy J' },
  { id: 'guy-mantzur', name: 'Guy Mantzur' },
  { id: 'haai', name: 'HAAi' },
  { id: 'hannes-bieger', name: 'Hannes Bieger' },
  { id: 'hardt-antoine', name: 'Hardt Antoine' },
  { id: 'hardwel', name: 'Hardwel' },
  { id: 'harvey', name: 'Harvey' },
  { id: 'hector', name: 'Hector' },
  { id: 'hector-oaks', name: 'Hector Oaks' },
  { id: 'henri-bergman', name: 'Henri Bergman' },
  { id: 'hernan-cattaneo', name: 'Hernan Cattaneo' },
  { id: 'holder', name: 'Holder' },
  { id: 'holmar', name: 'Holmar' },
  { id: 'hoomance', name: 'Hoomance' },
  { id: 'hosh', name: 'Hosh' },
  { id: 'hot-since-82', name: 'Hot Since 82' },
  { id: 'hraach', name: 'Hraach' },
  { id: 'husa-and-zeyada', name: 'Husa & Zeyada' },
  { id: 'ida-engberg', name: 'Ida Engberg' },
  { id: 'idriss-d', name: 'Idriss D' },
  { id: 'igor-marijuan', name: 'Igor Marijuan' },
  { id: 'ilich-mujica', name: 'Ilich Mujica' },
  { id: 'indira-paganotto', name: 'Indira Paganotto' },
  { id: 'innelea', name: 'Innelea' },
  { id: 'irene-dresel', name: 'Irene Dresel' },
  { id: 'isi-audi', name: 'Isi Audi' },
  { id: 'jackmaster', name: 'Jackmaster' },
  { id: 'jacob-groening', name: 'Jacob Groening' },
  { id: 'jaguar', name: 'Jaguar' },
  { id: 'james-de-torres', name: 'James de Torres' },
  { id: 'jamie-jones', name: 'Jamie Jones' },
  { id: 'jan-blomqvist', name: 'Jan Blomqvist' },
  { id: 'jeff-mills', name: 'Jeff Mills' },
  { id: 'jenia-tarsol', name: 'Jenia Tarsol' },
  { id: 'jennifer-cardini', name: 'Jennifer Cardini' },
  { id: 'jeremy-olander', name: 'Jeremy Olander' },
  { id: 'jessica-audiffred', name: 'Jessica Audiffred' },
  { id: 'jessica-brankka', name: 'Jessica Brankka' },
  { id: 'jim-rider', name: 'Jim Rider' },
  { id: 'jimi-jules', name: 'Jimi Jules' },
  { id: 'joan-atkins', name: 'Joan Atkins' },
  { id: 'job-jobse', name: 'Job Jobse' },
  { id: 'joep-mencke', name: 'Joep Mencke' },
  { id: 'john-acquaviva', name: 'John Acquaviva' },
  { id: 'john-digweed', name: 'John Digweed' },
  { id: 'joke', name: 'Joke' },
  { id: 'jonathan-kaspar', name: 'Jonathan Kaspar' },
  { id: 'joris-delacroix', name: 'Joris Delacroix' },
  { id: 'joris-voorn', name: 'Joris Voorn' },
  { id: 'jose-noventa', name: 'Jose Noventa' },
  { id: 'joseph-capriati', name: 'Joseph Capriati' },
  { id: 'josh-gigante', name: 'Josh Gigante' },
  { id: 'josh-wink', name: 'Josh Wink' },
  { id: 'just-her', name: 'Just Her' },
  { id: 'justin-strauss', name: 'Justin Strauss' },
  { id: 'kadosh', name: 'Kadosh' },
  { id: 'kasper-bjorke', name: 'Kasper Björke' },
  { id: 'kate-zubok', name: 'Kate Zubok' },
  { id: 'kaz-james', name: 'Kaz James' },
  { id: 'keinemusik', name: 'Keinemusik' },
  { id: 'kenny-larkin', name: 'Kenny Larkin' },
  { id: 'kerala-dust', name: 'Kerala Dust' },
  { id: 'kevin-de-vries', name: 'Kevin De Vries' },
  { id: 'kevin-sanderson', name: 'Kevin Sanderson' },
  { id: 'khen', name: 'Khen' },
  { id: 'kolektiv-turmstrasse', name: 'Kolektiv Turmstrasse' },
  { id: 'kolsch', name: 'Kölsch' },
  { id: 'komashov', name: 'Komashov' },
  { id: 'konstantin-giegling', name: 'Konstantin Giegling' },
  { id: 'konstantin-sibold', name: 'Konstantin Sibold' },
  { id: 'kora', name: 'Kora' },
  { id: 'kshmr', name: 'Kshmr' },
  { id: 'kura', name: 'Kura' },
  { id: 'kygo', name: 'Kygo' },
  { id: 'lady-starlight', name: 'Lady Starlight' },
  { id: 'landikhan', name: 'Landikhan' },
  { id: 'laoulu', name: 'Laoulu' },
  { id: 'lauren-mia', name: 'Lauren Mia' },
  { id: 'laurent-garnier', name: 'Laurent Garnier' },
  { id: 'lee-ann-roberts', name: 'Lee Ann Roberts' },
  { id: 'lee-burridge', name: 'Lee Burridge' },
  { id: 'lehar', name: 'Lehar' },
  { id: 'lemurian', name: 'Lemurian' },
  { id: 'len-faki', name: 'Len Faki' },
  { id: 'leon-fr', name: 'Leon (FR)' },
  { id: 'louie-vega', name: 'Louie Vega' },
  { id: 'lp-giobbi', name: 'LP Giobbi' },
  { id: 'luca-saporito', name: 'Luca Saporito' },
  { id: 'luch', name: 'Luch' },
  { id: 'luciano', name: 'Luciano' },
  { id: 'luigi-madonna', name: 'Luigi Madonna' },
  { id: 'lum', name: 'Lum' },
  { id: 'maceo-plex', name: 'Maceo Plex' },
  { id: 'madmotormiquel', name: 'Madmotormiquel' },
  { id: 'madota-music', name: 'Madota Music' },
  { id: 'maga', name: 'Maga' },
  { id: 'magdalena', name: 'Magdalena' },
  { id: 'mhfoud', name: 'Mâhfoud' },
  { id: 'mahmut-oran', name: 'Mahmut Oran' },
  { id: 'mala-ika', name: 'Mala Ika' },
  { id: 'mandrake', name: 'Mandrake' },
  { id: 'mandy', name: 'Mandy' },
  { id: 'mano-le-tough', name: 'Mano Le Tough' },
  { id: 'mapache', name: 'Map.ache' },
  { id: 'marcel-dettmann', name: 'Marcel Dettmann' },
  { id: 'marco-carola', name: 'Marco Carola' },
  { id: 'marco-faraone', name: 'Marco Faraone' },
  { id: 'marino-canal', name: 'Marino Canal' },
  { id: 'markus-schulz', name: 'Markus Schulz' },
  { id: 'marsh', name: 'Marsh' },
  { id: 'marshmellow', name: 'Marshmellow' },
  { id: 'marten-lou', name: 'Marten Lou' },
  { id: 'martin-garrix', name: 'Martin Garrix' },
  { id: 'martin-roch', name: 'Martin Roch' },
  { id: 'marvin-and-guy', name: 'Marvin & Guy' },
  { id: 'masano', name: 'Masano' },
  { id: 'mashrik', name: 'Mashrik' },
  { id: 'massam', name: 'Massam' },
  { id: 'mat-joe', name: 'Mat Joe' },
  { id: 'mathew-jonson', name: 'Mathew Jonson' },
  { id: 'mathias-kaden', name: 'Mathias Kaden' },
  { id: 'matisa', name: 'Matisa' },
  { id: 'matjoe', name: 'Matjoe' },
  { id: 'matthias-meyer', name: 'Matthias Meyer' },
  { id: 'max-cooper', name: 'Max Cooper' },
  { id: 'maxi-meraki', name: 'Maxi Meraki' },
  { id: 'meca', name: 'Meca' },
  { id: 'mees-salome', name: 'Mees Salomé' },
  { id: 'memo', name: 'MEMO' },
  { id: 'mendrix', name: 'Mendrix' },
  { id: 'metrika', name: 'Metrika' },
  { id: 'miguelle-and-tons', name: 'Miguelle & Tons' },
  { id: 'mimi-love', name: 'Mimi Love' },
  { id: 'mind-against', name: 'Mind Against' },
  { id: 'mira', name: 'Mira' },
  { id: 'mishell', name: 'Mishell' },
  { id: 'miss-monique', name: 'Miss Monique' },
  { id: 'mita-gami', name: 'Mita Gami' },
  { id: 'moblack', name: 'MoBlack' },
  { id: 'moderna', name: 'Moderna' },
  { id: 'monolink', name: 'Monolink' },
  { id: 'mooglie', name: 'Mooglie' },
  { id: 'moojoo', name: 'Moojoo' },
  { id: 'moritz-hofbauer', name: 'Moritz Hofbauer' },
  { id: 'murat-uncuoglu', name: 'Murat Uncuoglu' },
  { id: 'musumeci', name: 'Musumeci' },
  { id: 'mystery-affair', name: 'Mystery Affair' },
  { id: 'nadav-vee', name: 'Nadav Vee' },
  { id: 'nandu', name: 'Nandu' },
  { id: 'nd-baumecker', name: 'ND Baumecker' },
  { id: 'nic-fanciulli', name: 'Nic Fanciulli' },
  { id: 'nick-varon', name: 'Nick Varon' },
  { id: 'nick-warren', name: 'Nick Warren' },
  { id: 'nico-morano', name: 'Nico Morano' },
  { id: 'nico-moreno', name: 'Nico Moreno' },
  { id: 'nico-stojan', name: 'Nico Stojan' },
  { id: 'nicolas-jaar', name: 'Nicolas Jaar' },
  { id: 'nicole-moudaber', name: 'Nicole Moudaber' },
  { id: 'niki-sadeki', name: 'Niki Sadeki' },
  { id: 'nina-kraviz', name: 'Nina Kraviz' },
  { id: 'nite-flite', name: 'Nite Flite' },
  { id: 'nomis', name: 'Nomis' },
  { id: 'nora-en-pure', name: 'Nora En Pure' },
  { id: 'notre-dame', name: 'Notre Dame' },
  { id: 'nto', name: 'NTO' },
  { id: 'nu', name: 'Nu' },
  { id: 'oceanvs-orientalis', name: 'Oceanvs Orientalis' },
  { id: 'oden-and-fatzo', name: 'Oden & Fatzo' },
  { id: 'olivier-koletzki', name: 'Olivier Koletzki' },
  { id: 'olivier-weiter', name: 'Olivier Weiter' },
  { id: 'omer-tayar', name: 'Omer Tayar' },
  { id: 'omri-gueta', name: 'Omri Gueta' },
  { id: 'oohna-dal', name: 'Oohna Dal' },
  { id: 'oostil', name: 'Oostil' },
  { id: 'oscar-l', name: 'Oscar L' },
  { id: 'otta', name: 'Otta' },
  { id: 'pablo-fierro', name: 'Pablo Fierro' },
  { id: 'pachanga-boys', name: 'Pachanga Boys' },
  { id: 'palm-traxx', name: 'Palm Traxx' },
  { id: 'pan-pot', name: 'Pan Pot' },
  { id: 'parallele', name: 'Parallele' },
  { id: 'parra-for-cuva', name: 'Parra For Cuva' },
  { id: 'patrice-baumel', name: 'Patrice Bäumel' },
  { id: 'patrick-mason', name: 'Patrick Mason' },
  { id: 'paul-kalkbrenner', name: 'Paul Kalkbrenner' },
  { id: 'paul-oakenfold', name: 'Paul Oakenfold' },
  { id: 'paul-van-dyk', name: 'Paul Van Dyk' },
  { id: 'pawsa', name: 'Pawsa' },
  { id: 'pete-tong', name: 'Pete Tong' },
  { id: 'peter-invasion', name: 'Peter Invasion' },
  { id: 'phunkadelica', name: 'Phunkadelica' },
  { id: 'pipi', name: 'Pipi' },
  { id: 'pole-position-squire-and-loic', name: 'Pole Position (Squire & Loic)' },
  { id: 'prunk', name: 'Prunk' },
  { id: 'radio-slave', name: 'Radio Slave' },
  { id: 'rampa', name: 'Rampa' },
  { id: 'rampue', name: 'Rampue' },
  { id: 'ramyen', name: 'Ramyen' },
  { id: 'raw-main', name: 'Raw Main' },
  { id: 'raxon', name: 'Raxon' },
  { id: 'ray-kash', name: 'Ray Kash' },
  { id: 'ray-okpara', name: 'Ray Okpara' },
  { id: 'rebolledo', name: 'Rebolledo' },
  { id: 'recondite', name: 'Recondite' },
  { id: 'reznik', name: 'Reznik' },
  { id: 'ricardo-villalobos', name: 'Ricardo Villalobos' },
  { id: 'richie-hawtin', name: 'Richie Hawtin' },
  { id: 'richy-ahmed', name: 'Richy Ahmed' },
  { id: 'riva-starr', name: 'Riva Starr' },
  { id: 'robert-hood', name: 'Robert Hood' },
  { id: 'robin-schulz', name: 'Robin Schulz' },
  { id: 'rodhad', name: 'Rodhad' },
  { id: 'rodriguez-jr', name: 'Rodriguez Jr' },
  { id: 'roger-sanchez', name: 'Roger Sanchez' },
  { id: 'rolbac', name: 'Rolbac' },
  { id: 'romain-garcia', name: 'Romain Garcia' },
  { id: 'rony-seikaly', name: 'Rony Seikaly' },
  { id: 'roy-rosenfeld', name: 'Roy Rosenfeld' },
  { id: 'royskopp', name: 'Royskopp' },
  { id: 'rufus-du-sol', name: 'Rufus du Sol' },
  { id: 'saand', name: 'Saand' },
  { id: 'sabo', name: 'Sabo' },
  { id: 'sainte-vie', name: 'Sainte Vie' },
  { id: 'sally-c', name: 'Sally C' },
  { id: 'sally-m', name: 'Sally M' },
  { id: 'salome-le-chat', name: 'Salomé Le Chat' },
  { id: 'sam-paganini', name: 'Sam Paganini' },
  { id: 'sam-shure', name: 'Sam Shure' },
  { id: 'samantha-togni', name: 'Samantha Togni' },
  { id: 'santiago-garcia', name: 'Santiago Garcia' },
  { id: 'sara-landry', name: 'Sara Landry' },
  { id: 'sarkis-mikael', name: 'Sarkis Mikael' },
  { id: 'satori', name: 'Satori' },
  { id: 'sean-doron', name: 'Sean Doron' },
  { id: 'sebastian-mullaert', name: 'Sebastian Mullaert' },
  { id: 'sebastien-leger', name: 'Sebastien Leger' },
  { id: 'serge-devant', name: 'Serge Devant' },
  { id: 'seth-schwartz', name: 'Seth Schwartz' },
  { id: 'seth-troxler', name: 'Seth Troxler' },
  { id: 'sezer-uysal', name: 'Sezer Uysal' },
  { id: 'shall-ocin', name: 'Shall Ocin' },
  { id: 'shimon', name: 'Shimon' },
  { id: 'shimza', name: 'Shimza' },
  { id: 'shubostar', name: 'Shubostar' },
  { id: 'silicone-soul', name: 'Silicone Soul' },
  { id: 'simone-de-kunovich', name: 'Simone De Kunovich' },
  { id: 'simone-gigante', name: 'Simone Gigante' },
  { id: 'snake', name: 'Snake' },
  { id: 'solomun', name: 'Solomun' },
  { id: 'sora', name: 'Sora' },
  { id: 'space-92', name: 'Space 92' },
  { id: 'spada', name: 'Spada' },
  { id: 'squire', name: 'Squire' },
  { id: 'stavroz', name: 'Stavroz' },
  { id: 'steve-aoki', name: 'Steve Aoki' },
  { id: 'steve-bug', name: 'Steve Bug' },
  { id: 'steve-rachmad', name: 'Steve Rachmad' },
  { id: 'stimming', name: 'Stimming' },
  { id: 'sven-vath', name: 'Sven Väth' },
  { id: 'sydney-charles', name: 'Sydney Charles' },
  { id: 'syreeta', name: 'Syreeta' },
  { id: 'tale-of-us', name: 'Tale of Us' },
  { id: 'tania-vulcano', name: 'Tania Vulcano' },
  { id: 'tara-brooks', name: 'Tara Brooks' },
  { id: 'ten-walls', name: 'Ten Walls' },
  { id: 'the-blaze', name: 'The Blaze' },
  { id: 'the-blessed-madonna', name: 'The Blessed Madonna' },
  { id: 'the-element', name: 'The Element' },
  { id: 'the-freedom-fighters', name: 'The Freedom fighters' },
  { id: 'the-ones', name: 'The Ones' },
  { id: 'the-soul-brothers', name: 'The Soul Brothers' },
  { id: 'themba', name: 'Themba' },
  { id: 'thugfucker', name: 'Thugfucker' },
  { id: 'tiefschwarz', name: 'Tiefschwarz' },
  { id: 'tiesto', name: 'Tiestö' },
  { id: 'tiga', name: 'Tiga' },
  { id: 'tim-green', name: 'Tim Green' },
  { id: 'timo-maas', name: 'Timo Maas' },
  { id: 'timujin', name: 'Timujin' },
  { id: 'tom-breu', name: 'Tom Breu' },
  { id: 'tony-de-vit', name: 'Tony De Vit' },
  { id: 'tony-y-not', name: 'Tony Y Not' },
  { id: 'tooker', name: 'Tooker' },
  { id: 'toto-chiavetta', name: 'Toto Chiavetta' },
  { id: 'traumer', name: 'Traumer' },
  { id: 'trentemoller', name: 'Trentemöller' },
  { id: 'trikk', name: 'Trikk' },
  { id: 'trym', name: 'Trym' },
  { id: 'urtrax', name: 'u.r.trax' },
  { id: 'ubbah', name: 'Ubbah' },
  { id: 'unders', name: 'Unders' },
  { id: 'underworld', name: 'Underworld' },
  { id: 'valentin-huedo', name: 'Valentin Huedo' },
  { id: 'vander', name: 'Vander' },
  { id: 'vanjee', name: 'Vanjee' },
  { id: 'victor-calderone', name: 'Victor Calderone' },
  { id: 'victor-ruiz', name: 'Victor Ruiz' },
  { id: 'viken-arman', name: 'Viken Arman' },
  { id: 'vintage-culture', name: 'Vintage Culture' },
  { id: 'vitalic', name: 'Vitalic' },
  { id: 'vntm', name: 'VNTM' },
  { id: 'volen-sentir', name: 'Volen Sentir' },
  { id: 'wahm', name: 'Wahm' },
  { id: 'wehbba', name: 'Wehbba' },
  { id: 'whitesquare', name: 'Whitesquare' },
  { id: 'who-made-who', name: 'Who Made Who' },
  { id: 'worakls', name: 'Worakls' },
  { id: 'wurtz', name: 'Wurtz' },
  { id: 'yamagucci', name: 'Yamagucci' },
  { id: 'yost-koen', name: 'Yost Koen' },
  { id: 'zombies-in-miami', name: 'Zombies In Miami' },
];

// ============================================
// HELPER FUNCTIONS
// ============================================

/**
 * Returns the complete list of all artists
 * @returns Array of all Artist objects
 */
export function getAllArtists(): Artist[] {
  return artists;
}

/**
 * Get total artist count
 * @returns Number of artists in the database
 */
export function getArtistCount(): number {
  return artists.length;
}

/**
 * Get artist by ID (slug)
 * @param id - Artist ID (slug)
 * @returns Artist object or undefined if not found
 */
export function getArtistById(id: string): Artist | undefined {
  return artists.find(a => a.id === id);
}

/**
 * Get artist by exact name match (case-insensitive)
 * @param name - Artist name to find
 * @returns Artist object or undefined if not found
 */
export function getArtistByName(name: string): Artist | undefined {
  return artists.find(a => a.name.toLowerCase() === name.toLowerCase());
}

/**
 * Search for artists by name (case-insensitive partial match)
 * @param query - Search string
 * @returns Array of matching artists
 */
export function searchArtists(query: string): Artist[] {
  const searchTerm = query.toLowerCase().trim();
  return artists.filter(artist =>
    artist.name.toLowerCase().includes(searchTerm)
  );
}

/**
 * Split artists into two columns for two-column layout
 * Returns [leftColumn, rightColumn] with equal or nearly equal distribution
 * @returns Tuple of two artist arrays
 */
export function getArtistColumns(): [Artist[], Artist[]] {
  const mid = Math.ceil(artists.length / 2);
  return [artists.slice(0, mid), artists.slice(mid)];
}

/**
 * Get artists sorted alphabetically by name
 * @param ascending - Sort direction (true for A-Z, false for Z-A)
 * @returns Sorted array of artists
 */
export function getArtistsSorted(ascending = true): Artist[] {
  const sorted = [...artists].sort((a, b) =>
    a.name.localeCompare(b.name, undefined, { sensitivity: 'base' })
  );
  return ascending ? sorted : sorted.reverse();
}

/**
 * Get paginated artists
 * @param page - Page number (1-indexed)
 * @param perPage - Number of artists per page (default: 50)
 * @returns Object with artists array and pagination metadata
 */
export function getPaginatedArtists(page: number = 1, perPage: number = 50): {
  artists: Artist[];
  total: number;
  page: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
} {
  const total = artists.length;
  const totalPages = Math.ceil(total / perPage);
  const start = (page - 1) * perPage;
  const end = start + perPage;

  return {
    artists: artists.slice(start, end),
    total,
    page,
    totalPages,
    hasNextPage: page < totalPages,
    hasPreviousPage: page > 1,
  };
}

/**
 * Get a random selection of artists
 * @param count - Number of artists to return
 * @returns Array of randomly selected artists
 */
export function getRandomArtists(count: number): Artist[] {
  const shuffled = [...artists].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, Math.min(count, artists.length));
}

/**
 * Get artists by first letter
 * @param letter - First letter to filter by (case-insensitive)
 * @returns Array of artists whose names start with the given letter
 */
export function getArtistsByLetter(letter: string): Artist[] {
  const firstChar = letter.toLowerCase().charAt(0);
  return artists.filter(a => a.name.toLowerCase().startsWith(firstChar));
}

/**
 * Get alphabetical grouping of artists (A-Z)
 * @returns Object with letters as keys and artist arrays as values
 */
export function getArtistsByAlphabet(): Record<string, Artist[]> {
  const grouped: Record<string, Artist[]> = {};

  artists.forEach(artist => {
    const firstChar = artist.name.charAt(0).toUpperCase();
    if (!grouped[firstChar]) {
      grouped[firstChar] = [];
    }
    grouped[firstChar].push(artist);
  });

  return grouped;
}

// ============================================
// TYPE GUARDS
// ============================================

/**
 * Type guard to check if a value is a valid Artist
 * @param value - Value to check
 * @returns Boolean indicating if value is an Artist
 */
export function isArtist(value: unknown): value is Artist {
  return (
    typeof value === "object" &&
    value !== null &&
    "id" in value &&
    "name" in value &&
    typeof (value as any).id === "string" &&
    typeof (value as any).name === "string"
  );
}

// ============================================
// STATISTICS
// ============================================

/**
 * Get basic statistics about the artist collection
 * @returns Object with artist statistics
 */
export function getArtistStats() {
  const alphabetStats = getArtistsByAlphabet();
  const letterCounts = Object.entries(alphabetStats)
    .map(([letter, artists]) => ({ letter, count: artists.length }))
    .sort((a, b) => b.count - a.count);

  return {
    total: artists.length,
    mostCommonFirstLetter: letterCounts[0]?.letter || '',
    leastCommonFirstLetter: letterCounts[letterCounts.length - 1]?.letter || '',
    letterDistribution: letterCounts,
    lastUpdated: "2025-12-24",
    status: "production",
  };
}

// ============================================
// USAGE EXAMPLES
// ============================================

/*
// Import in your components:
import { getAllArtists, searchArtists, getArtistById, type Artist } from '@/lib/artists'

// Get all artists:
const allArtists = getAllArtists()

// Get artist count:
const count = getArtistCount() // 503

// Search for artists:
const results = searchArtists('carl')

// Get artist by ID:
const artist = getArtistById('above-and-beyond')

// Get artist by name:
const artist = getArtistByName('Above & Beyond')

// Get two columns for layout:
const [leftColumn, rightColumn] = getArtistColumns()

// Paginated display:
const { artists, total, page, totalPages } = getPaginatedArtists(1, 50)

// Get artists by letter:
const aArtists = getArtistsByLetter('A')

// Get alphabetical grouping:
const grouped = getArtistsByAlphabet()
// { 'A': [...], 'B': [...], ... }
*/
