'use strict';

angular.module('linagora.esn.contact')

  .factory('ContactShellDisplayBuilder', function(DisplayShellProvider) {

    function build(shell) {
      return DisplayShellProvider.toDisplayShell(shell);
    }

    return {
      build: build
    };
  })

  .factory('ContactShellHelper', function() {

    function getMetadata(shell) {
      if (!shell || !shell.href) {
        return;
      }

      var href = shell.href;
      var split = href.split('/');
      var cardId = split.pop().split('.').shift();
      var bookName = split.pop();
      var bookId = split.pop();

      return {
        cardId: cardId,
        bookId: bookId,
        bookName: bookName
      };
    }

    return {
      getMetadata: getMetadata
    };
  });
