export type Language = 'en' | 'zh' | 'ja' | 'ko' | 'es' | 'fr' | 'de';

export const translations = {
  en: {
    nav: {
      home: "Home",
      discover: "Discover",
      alerts: "Alerts",
      profile: "Profile",
      settings: "Settings",
      newVote: "New Vote",
      signIn: "Sign In",
      signOut: "Sign Out"
    },
    feed: {
      polls: "Polls",
      posts: "Posts",
      trending: "Trending",
      following: "Following",
      placeholder: "What's on your mind?",
      post: "Post",
      posting: "Posting...",
      addOption: "+ Add option",
      removePoll: "Remove poll",
      noPosts: "No posts found.",
      signInToSee: "Sign in to see posts from people you follow."
    },
    post: {
      follow: "Follow",
      block: "Block",
      notInterested: "Not interested",
      tip: "Tip",
      copy: "Copy",
      walletInfo: "WALLET INFO",
      walletCopied: "Info copied!",
      tipDesc: "Support this creator by sending crypto.",
      done: "Done"
    },
    settings: {
      title: "Settings",
      profileWallet: "Profile & Wallet",
      language: "Language",
      save: "Save Changes",
      saving: "Saving...",
      saved: "Saved!"
    }
  },
  zh: {
    nav: {
      home: "主页",
      discover: "发现",
      alerts: "通知",
      profile: "个人资料",
      settings: "设置",
      newVote: "发起投票",
      signIn: "登录",
      signOut: "退出"
    },
    feed: {
      polls: "投票",
      posts: "动态",
      trending: "热门",
      following: "关注",
      placeholder: "有什么新鲜事？",
      post: "发布",
      posting: "发布中...",
      addOption: "+ 添加选项",
      removePoll: "移除投票",
      noPosts: "暂无内容",
      signInToSee: "登录后查看关注人的动态"
    },
    post: {
      follow: "关注",
      block: "屏蔽",
      notInterested: "不感兴趣",
      tip: "打赏",
      copy: "复制",
      walletInfo: "钱包信息",
      walletCopied: "已复制！",
      tipDesc: "发送加密货币支持该创作者",
      done: "完成"
    },
    settings: {
      title: "设置",
      profileWallet: "资料与钱包",
      language: "语言",
      save: "保存更改",
      saving: "保存中...",
      saved: "已保存！"
    }
  },
  ja: {
    nav: {
      home: "ホーム",
      discover: "話題を検索",
      alerts: "通知",
      profile: "プロフィール",
      settings: "設定",
      newVote: "投票を作成",
      signIn: "ログイン",
      signOut: "ログアウト"
    },
    feed: {
      polls: "投票",
      posts: "投稿",
      trending: "トレンド",
      following: "フォロー中",
      placeholder: "いまどうしてる？",
      post: "ポストする",
      posting: "送信中...",
      addOption: "+ 選択肢を追加",
      removePoll: "投票を削除",
      noPosts: "投稿はありません",
      signInToSee: "ログインしてフォロー中のユーザーの投稿を表示"
    },
    post: {
      follow: "フォロー",
      block: "ブロック",
      notInterested: "興味なし",
      tip: "チップ",
      copy: "コピー",
      walletInfo: "ウォレット情報",
      walletCopied: "コピーしました！",
      tipDesc: "暗号資産を送ってクリエイターを支援",
      done: "完了"
    },
    settings: {
      title: "設定",
      profileWallet: "プロフィールとウォレット",
      language: "言語",
      save: "変更を保存",
      saving: "保存中...",
      saved: "保存しました！"
    }
  },
  ko: {
    nav: {
      home: "홈",
      discover: "탐색",
      alerts: "알림",
      profile: "프로필",
      settings: "설정",
      newVote: "투표 만들기",
      signIn: "로그인",
      signOut: "로그아웃"
    },
    feed: {
      polls: "투표",
      posts: "게시물",
      trending: "트렌드",
      following: "팔로잉",
      placeholder: "무슨 일이 일어나고 있나요?",
      post: "게시하기",
      posting: "게시 중...",
      addOption: "+ 옵션 추가",
      removePoll: "투표 삭제",
      noPosts: "게시물이 없습니다",
      signInToSee: "팔로우하는 사람들의 게시물을 보려면 로그인하세요"
    },
    post: {
      follow: "팔로우",
      block: "차단",
      notInterested: "관심 없음",
      tip: "후원",
      copy: "복사",
      walletInfo: "지갑 정보",
      walletCopied: "복사되었습니다!",
      tipDesc: "암호화폐로 크리에이터 후원하기",
      done: "완료"
    },
    settings: {
      title: "설정",
      profileWallet: "프로필 및 지갑",
      language: "언어",
      save: "변경 사항 저장",
      saving: "저장 중...",
      saved: "저장됨!"
    }
  },
  es: {
    nav: {
      home: "Inicio",
      discover: "Explorar",
      alerts: "Notificaciones",
      profile: "Perfil",
      settings: "Configuración",
      newVote: "Nueva Votación",
      signIn: "Iniciar sesión",
      signOut: "Cerrar sesión"
    },
    feed: {
      polls: "Encuestas",
      posts: "Publicaciones",
      trending: "Tendencias",
      following: "Siguiendo",
      placeholder: "¿Qué está pasando?",
      post: "Publicar",
      posting: "Publicando...",
      addOption: "+ Añadir opción",
      removePoll: "Eliminar encuesta",
      noPosts: "No hay publicaciones",
      signInToSee: "Inicia sesión para ver publicaciones de gente que sigues"
    },
    post: {
      follow: "Seguir",
      block: "Bloquear",
      notInterested: "No me interesa",
      tip: "Propina",
      copy: "Copiar",
      walletInfo: "INFO DE CARTERA",
      walletCopied: "¡Copiado!",
      tipDesc: "Apoya a este creador enviando criptomonedas",
      done: "Listo"
    },
    settings: {
      title: "Configuración",
      profileWallet: "Perfil y Cartera",
      language: "Idioma",
      save: "Guardar cambios",
      saving: "Guardando...",
      saved: "¡Guardado!"
    }
  },
  fr: {
    nav: {
      home: "Accueil",
      discover: "Découvrir",
      alerts: "Notifications",
      profile: "Profil",
      settings: "Paramètres",
      newVote: "Nouveau Vote",
      signIn: "Se connecter",
      signOut: "Se déconnecter"
    },
    feed: {
      polls: "Sondages",
      posts: "Posts",
      trending: "Tendances",
      following: "Abonnements",
      placeholder: "Quoi de neuf ?",
      post: "Publier",
      posting: "Envoi...",
      addOption: "+ Ajouter une option",
      removePoll: "Supprimer le sondage",
      noPosts: "Aucun post trouvé",
      signInToSee: "Connectez-vous pour voir les posts de vos abonnements"
    },
    post: {
      follow: "Suivre",
      block: "Bloquer",
      notInterested: "Pas intéressé",
      tip: "Don",
      copy: "Copier",
      walletInfo: "INFO PORTEFEUILLE",
      walletCopied: "Copié !",
      tipDesc: "Soutenez ce créateur en envoyant des cryptos",
      done: "Terminé"
    },
    settings: {
      title: "Paramètres",
      profileWallet: "Profil & Portefeuille",
      language: "Langue",
      save: "Enregistrer",
      saving: "Enregistrement...",
      saved: "Enregistré !"
    }
  },
  de: {
    nav: {
      home: "Startseite",
      discover: "Entdecken",
      alerts: "Mitteilungen",
      profile: "Profil",
      settings: "Einstellungen",
      newVote: "Neue Umfrage",
      signIn: "Anmelden",
      signOut: "Abmelden"
    },
    feed: {
      polls: "Umfragen",
      posts: "Beiträge",
      trending: "Trends",
      following: "Folge ich",
      placeholder: "Was gibt's Neues?",
      post: "Posten",
      posting: "Posten...",
      addOption: "+ Option hinzufügen",
      removePoll: "Umfrage entfernen",
      noPosts: "Keine Beiträge gefunden",
      signInToSee: "Melde dich an, um Beiträge von Leuten zu sehen, denen du folgst"
    },
    post: {
      follow: "Folgen",
      block: "Blockieren",
      notInterested: "Kein Interesse",
      tip: "Trinkgeld",
      copy: "Kopieren",
      walletInfo: "WALLET INFO",
      walletCopied: "Kopiert!",
      tipDesc: "Unterstütze diesen Creator mit Krypto",
      done: "Fertig"
    },
    settings: {
      title: "Einstellungen",
      profileWallet: "Profil & Wallet",
      language: "Sprache",
      save: "Speichern",
      saving: "Speichern...",
      saved: "Gespeichert!"
    }
  }
};

