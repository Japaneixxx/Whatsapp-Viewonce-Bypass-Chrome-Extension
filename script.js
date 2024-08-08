(function () {
  "use strict";

  const loadModule = (name, id) => {
    window.ErrorGuard?.skipGuardGlobal(true);
    return new Promise((r) => {
      try {
        window.webpackChunkwhatsapp_web_client?.push([
          [Math.random()],
          {},
          (e) => {
            const module = e(id);
            r(module.default ? module.default : module);
          },
        ]);
        r(window.require?.(name));
      } catch (e) {
        r(null);
      }
    });
  };

  const getIndexedDB = (database, table, key) => {
    // ... (resto da função getIndexedDB como no código original)
  };

  const setIndexedDB = (database, table, object) => {
    // ... (resto da função setIndexedDB como no código original)
  };

  const initScript = async () => {
    if (!document.querySelector("#side")) {
      setTimeout(initScript, 1000);
      return;
    }

    (await loadModule("WAWebCollections", 729804)).Msg.on(
      "add",
      async (msg) => {
        msg.__x_isViewOnce = false;

        const IDBmessage = await getIndexedDB(
          "model-storage",
          "message",
          msg.id._serialized
        );
        if (!IDBmessage) return;
        IDBmessage.isViewOnce = false;
        setIndexedDB("model-storage", "message", IDBmessage);
      }
    );

    (
      await loadModule("WAWebChatCollection", 351053)
    ).ChatCollection.getModelsArray().forEach(async (e) => {
      const lastMessage = e.msgs._models[e.msgs._models.length - 1];
      if (!lastMessage) return;

      lastMessage.isViewOnce = false;

      const IDBmessage = await getIndexedDB(
        "model-storage",
        "message",
        lastMessage.id._serialized
      );
      if (!IDBmessage) return;
      IDBmessage.isViewOnce = false;
      setIndexedDB("model-storage", "message", IDBmessage);
    });
  };

  // Inicia o script quando a página estiver carregada
  if (
    document.readyState === "complete" ||
    document.readyState === "interactive"
  ) {
    initScript();
  } else {
    document.addEventListener("DOMContentLoaded", initScript);
  }
})();
