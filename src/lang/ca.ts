import { Animations, Mode, Theme } from '@/entities/Settings'
import { Difficulty } from '@/services/DifficultyGenerator'

export const ca = {
  clipboard_button_label: 'Copiar al porta-retalls',
  credits_developer: 'un joc desenvolupat per',
  credits_family: 'i especialmet a la meva família i amics',
  credits_header: 'Huezzle',
  credits_libraries: 'Totes les persones que han desenvolupat les biblioteques i eines que m\'han ajudat a crear aquest joc',
  credits_sub_thanks: 'per donar suport el desenvolupament, donar idees i ajudar provant el joc',
  credits_thanks: 'Agraïments',
  difficulty: {
    [Difficulty.easy]: 'Fàcil',
    [Difficulty.hard]: 'Difícil',
    [Difficulty.normal]: 'Normal',
    all: 'Total'
  },
  footer_hints_button_label: 'Mostrar pista {hints}/3',
  footer_settings_button_label: 'Configuració',
  footer_statistics_button_label: 'Veure estadístiques',
  footer_victory_button_label: 'Veure resultats',
  meta_description: 'Un nou trencaclosques cada dia, ordena les celdes de colors i competeix contra els teus amics i familiars.',
  meta_title: 'Huezzle - El teu trencaclosques diari',
  new_puzzle_button: 'Som-hi',
  new_puzzle_message: 'Hi ha un nou Huezzle disponible!',
  popup_close: 'Tancar',
  settings_animations_button: {
    [Animations.disabled]: 'Desactivades',
    [Animations.fast]: 'Ràpides',
    [Animations.normal]: 'Normals',
    [Animations.slow]: 'Lentes'
  },
  settings_animations_label: 'Animacions',
  settings_backup_export_button: 'Exportar',
  settings_backup_import_button: 'Importar',
  settings_backup_label: 'Recolzar estadístiques',
  settings_credits_button: 'Veure',
  settings_credits_label: 'Crèdits',
  settings_header: 'Configuració',
  settings_language_auto: 'Automàtic (Català)',
  settings_language_label: 'Llengua',
  settings_language_name: 'Català',
  settings_mode_button: {
    [Mode.both]: 'Ambdós',
    [Mode.grab]: 'Arrossegar',
    [Mode.touch]: 'Tocar'
  },
  settings_mode_label: 'Mode d\'intercanvi',
  settings_support_label: 'Dona suport al desenvolupador',
  settings_theme_button: {
    [Theme.auto]: 'Automàtic',
    [Theme.dark]: 'Obscur',
    [Theme.light]: 'Clar'
  },
  settings_theme_label: 'Tema',
  settings_tutorial_button: 'Reiniciar',
  settings_tutorial_label: 'Tutorial',
  share_button_label: 'Compartir',
  share_message: 'El Huezzle del dia #{number}:\n🕑 Temps: {time}\n🔄 Moviments: {movements}\n💡 Pistes: {hints}\n',
  statistics_average_movements: 'Mitjana de moviments',
  statistics_average_time: 'Temps mitjà',
  statistics_best_movements: 'Millors moviments',
  statistics_best_time: 'Millor temps',
  statistics_header: 'Estadístiques',
  statistics_played_games: 'Partides jugades',
  statistics_requested_hints: 'Pistes',
  statistics_total_movements: 'Moviments totals',
  statistics_total_time: 'Temps total',
  tutorial_grab_message: 'Arrossega una casella sobre un altre per intercanviar les seves posicions',
  tutorial_sort_message: 'Ordena totes les caselles de nou per a guanyar',
  tutorial_start_message: 'Toca per a començar',
  tutorial_touch_message: 'Toca una casella i després un altre per intercanviar les seves posicions',
  tweet_button_label: 'Publicar',
  twitter_tips_1: 'Segueix a',
  twitter_tips_2: 'en X per rebre consells diaris i estar informat de totes les actualitzacions.',
  updates_downloading_message: 'Descarregant actualització...',
  updates_ready_button: 'Aplicar',
  updates_ready_message: 'Actualització llesta!',
  victory_header: 'Victoria!',
  victory_movements_label: 'Moviments:',
  victory_next_huezzle_label: 'Següent Huezzle:',
  victory_time_label: 'Temps:'
}
