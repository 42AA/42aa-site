/* ==========================================================================
   42AA — Data Store: Tracks, Members, Group Photos, Social Links
   ========================================================================== */

window.BAND_DATA = {
  singleTitle: "Новый сингл — Tremendous",

  tracks: [
    {
      id: "elephant",
      title: "Elephant",
      album: "Новый сингл — Tremendous",
      src: "assets/audio/elephant.mp3",
      duration: 152, // 2:32 (auto-synced from MP3 metadata)
      cover: "assets/images/cover-tremendous.jpg",
      color: "#B83F33"
    },
    {
      id: "egypt",
      title: "Egypt",
      album: "Новый сингл — Tremendous",
      src: "assets/audio/egypt.mp3",
      duration: 414, // 6:54 (auto-synced from MP3 metadata)
      cover: "assets/images/cover-tremendous.jpg",
      color: "#7EA89D"
    }
  ],

  members: [
    {
      name: "Мананникова Глафира",
      role: "вокал, клавишные, гитара",
      photo: "assets/images/member-glafira.jpg",
      accent: "#D65242"
    },
    {
      name: "Денисов Тимофей",
      role: "бас, саксофон",
      photo: "assets/images/member-timofey.jpg",
      accent: "#7EA89D"
    },
    {
      name: "Адамович Лейсан",
      role: "вокал, гитара",
      photo: "assets/images/member-leysan.jpg",
      accent: "#E4B262"
    },
    {
      name: "Бериев Игорь",
      role: "барабаны",
      photo: "assets/images/member-igor.jpg",
      accent: "#B83F33"
    }
  ],

  photos: [
    { src: "assets/images/group-1.jpg", span: "wide" },
    { src: "assets/images/group-2.jpg", span: "tall" },
    { src: "assets/images/group-3.jpg", span: "normal" },
    { src: "assets/images/group-4.jpg", span: "normal" }
  ],

  socials: [
    {
      name: "ВКонтакте",
      url: "https://vk.ru/42aa_band",
      color: "#8BB8AD",
      icon: "vk"
    },
    {
      name: "Telegram",
      url: "https://t.me/we_are_42AA",
      color: "#7EA89D",
      icon: "telegram"
    },
    {
      name: "Instagram",
      url: "https://www.instagram.com/42aaband",
      color: "#E4B262",
      icon: "instagram"
    },
    {
      name: "YouTube",
      url: "https://youtube.com/@42_aa?si=XjieXTo2Y0fF2dw-",
      color: "#D65242",
      icon: "youtube"
    },
    {
      name: "Bandcamp",
      url: "https://42aa.bandcamp.com/album/tremendous",
      color: "#E4B262",
      icon: "bandcamp"
    },
    {
      name: "Яндекс Музыка",
      url: "https://music.yandex.ru/artist/24979085",
      color: "#E4B262",
      icon: "yandex"
    },
    {
      name: "Apple Music",
      url: "https://music.apple.com/ru/album/6819606914",
      color: "#D65242",
      icon: "apple"
    },
    {
      name: "Spotify",
      url: "https://open.spotify.com/album/39S4UTcTRiWxEa43x3Ou8C",
      color: "#7EA89D",
      icon: "spotify"
    }
  ]
};
