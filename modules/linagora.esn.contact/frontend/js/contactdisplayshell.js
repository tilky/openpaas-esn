'use strict';

angular.module('linagora.esn.contact')
  .factory('ContactDisplayShell', function(ContactsHelper, CONTACT_ATTRIBUTES_ORDER, CONTACT_DEFAULT_AVATAR) {
    var ContactDisplayShell = function(shell) {
      if (shell) {
        this.shell = shell;
        this.writable = true;
        this.overlayIcon = {iconClasses: 'ng-hide'};
        this.informationsToDisplay = [];

        if (this.shell.emails && this.shell.emails.length) {
          var email = ContactsHelper.getOrderedValues(this.shell.emails, CONTACT_ATTRIBUTES_ORDER.email)[0].value;
          this.informationsToDisplay.push({
            objectType: 'email',
            id: email,
            icon: 'mdi-email-outline',
            action: 'mailto:' + email
          });
        }
        if (this.shell.tel && this.shell.tel.length) {
          var tel = ContactsHelper.getOrderedValues(this.shell.tel, CONTACT_ATTRIBUTES_ORDER.phone)[0].value;
          this.informationsToDisplay.push({
            objectType: 'phone',
            id: tel,
            icon: 'mdi-phone',
            action: 'tel:' + tel
          });
        }
        this.dropDownMenuDirective = 'default-menu-items';
        this.fallbackAvatar = CONTACT_DEFAULT_AVATAR;
      }
    };

    ContactDisplayShell.prototype.isWritable = function() {
      return this.writable;
    };

    ContactDisplayShell.prototype.getDefaultAvatar = function() {
      return this.fallbackAvatar;
    };

    ContactDisplayShell.prototype.getDisplayName = function() {
      return this.shell.displayName;
    };

    ContactDisplayShell.prototype.getOverlayIcon = function() {
      return this.overlayIcon.iconClasses;
    };

    ContactDisplayShell.prototype.getInformationsToDisplay = function() {
      return this.informationsToDisplay;
    };

    ContactDisplayShell.prototype.getDropDownMenu = function() {
      return this.dropDownMenuDirective;
    };

    return ContactDisplayShell;
  });
