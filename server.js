/* Start chrome with CORS off:
/Applications/Google\ Chrome.app/Contents/MacOS/Google\ Chrome --disable-web-security --user-data-dir="~/ChromeDev"
*/

const express = require('express');
const cors = require('cors');
const ngrok = require('ngrok'); // Ensure ngrok is installed
const app = express();
const port = process.env.PORT || 8000;

// Set this to true to use ngrok, false to use the local port
const useNgrok = false; // Toggle this value

const corsOptions = {
  origin: '*', 
  methods: 'GET,POST,PUT,DELETE,OPTIONS', // Include all necessary methods
  allowedHeaders: 'Content-Type,Authorization,X-Requested-With,Origin,Accept',
  optionsSuccessStatus: 200, // Some legacy browsers (IE11, various SmartTVs) choke on 204
};

app.options('*', cors(corsOptions)); 
app.use(express.json());

// Middleware to log requests
app.use((req, res, next) => {
  console.log('Received request on', req.path);
  console.log('Request Method:', req.method);
  console.log('Request Headers:', JSON.stringify(req.headers, null, 2));
  console.log('Request Body:', JSON.stringify(req.body, null, 2));
  console.log('Request Query:', JSON.stringify(req.query, null, 2));
  next();
});

app.get('/overrides', (req, res) => {
  res.send({
    themeV2: {
      loginBox: {
        login: {},
        signup: {
          splitFullName: true,
        },
        pageFooter: {
          type: 'inline',
          html: `\n            <div style=\"text-align: center; padding: 10px;\">\n              <label style=\"display: flex; align-items: center; gap: 8px; padding: 5px 10px; border: 1px solid #ccc; border-radius: 4px; background-color: #ffffff; cursor: pointer;\">\n                <select id=\"language-select\" style=\"border: none; font-size: 14px; outline: none;\" onchange=\"(function(selectedValue) {\n                  const languageMap = {\n                    'en': 'English',\n                    'es': 'Spanish',\n                    'de': 'German',\n                    'fr': 'French',\n                    'it': 'Italian'\n                  };\n                  localStorage.setItem('frontegg-language', selectedValue);\n                  console.log('Language updated to:', languageMap[selectedValue]);\n                  location.reload();\n                })(this.value)\">\n                  <option value=\"en\">🇬🇧 English</option>\n                  <option value=\"es\">🇪🇸 Spanish</option>\n                  <option value=\"de\">🇩🇪 German</option>\n                  <option value=\"fr\">🇫🇷 French</option>\n                  <option value=\"it\">🇮🇹 Italian</option>\n                </select>\n              </label>\n              <div style=\"margin-top: 10px;\">\n                <a href=\"https://fuelix.atlassian.net/servicedesk/customer/portals\" style=\"color: #ffffff; text-decoration: none; display: inline-block; padding: 10px 20px; border-radius: 5px; background-color: #4b286d;\">\n                  Get support\n                </a>\n              </div>\n            </div>\n          `,
          scriptTags: [
            {
              inlineCode: "setTimeout(() => { const savedLanguage = localStorage.getItem('frontegg-language') || 'en'; document.getElementById('frontegg-login-box-container-default').shadowRoot.querySelector('#language-select').value = savedLanguage; }, 0);"
            }
          ]
        },
      },
    },
    localizations: {
      en: {
        loginBox: {
          login: {
            title: "Sign In",
            signUpMessage: "Don't have an account? Sign up here.",
            signUpLink: "Create a new account",
            forgotPassword: "Forgot your password?",
            emailInputLabel: "Email Address",
            emailInputPlaceholder: "name@example.com",
            emailMustBeValid: "Please enter a valid email address.",
            emailIsRequired: "Email address is required.",
            passwordInputLabel: "Password",
            passwordInputPlaceholder: "Enter your password",
            passwordMustBeCharacters: "Password must be at least 8 characters.",
            passwordIsRequired: "Password is required.",
            login: "Log In",
            continue: "Continue",
            invalidTitle: "Invalid Login Attempt",
            signInWithSocialLogin: "Or sign in with:",
            backToLogin: "Back to login",
            mfaTitle: "Multi-Factor Authentication",
            mfaSubtitle: "Please enter the code sent to your device.",
            mfaAuthenticatorTitle: "Authenticator Code",
            mfaInputLabel: "Enter MFA Code",
            mfaCodeIsRequired: "MFA code is required.",
            mfaCodeLengthAtLeast6: "MFA code must be at least 6 digits.",
            twoFactorCodeIsRequired: "Two-factor code is required.",
            twoFactorCodeLengthAtLeast8: "Two-factor code must be at least 8 digits.",
            mfaRememberThisDevice: "Remember this device for future logins.",
            mfaRememberLongerThenYear: "Keep me logged in for a year or more.",
            disableMultiFactorTitle: "Disable MFA",
            disableMultiFactorMessage: "Are you sure you want to disable multi-factor authentication?",
            recoverMfaTitle: "Recover Multi-Factor Authentication",
            recoverMfaMessage: "Enter your recovery code to regain access.",
            disabledMultiFactorClickHereButton: "Click here to recover MFA.",
            enterRecoveryCode: "Enter your recovery code",
            disabledMultiFactorButton: "Recover MFA",
            missingPolicyErrorMessage: "Your login policy is missing required configurations.",
            magicLinkTitle: "Magic Link Sent",
            magicLinkText: "Check your email to sign in using the magic link.",
            magicLinkResend: "Resend magic link",
            magicLinkResending: "Resending magic link...",
            invalidMagicLinkTitle: "Invalid Magic Link",
            invalidMagicLinkText: "The magic link you used is invalid or expired.",
            smsOtcTitle: "SMS One-Time Code",
            smsOtcMessage: "Please enter the one-time code sent to your phone.",
            smsOtcChangePhoneMessage: "Change your phone number?",
            otcTitle: "One-Time Code",
            otcMessage: "Enter the code sent to your device.",
            otcInputLabel: "Enter Code",
            otcInputPlaceholder: "123456",
            otcCodeIsRequired: "One-time code is required.",
            otcContinue: "Verify",
            otcHaventReceivedCode: "Didn't receive a code?",
            otcResend: "Resend Code",
            otcResending: "Resending code...",
            otcInvalidLengthCode: "The code must be exactly 6 digits.",
            ssoRedirectToMessage: "Redirecting to your SSO provider...",
            failedOicdLoginTitle: "Login Failed",
            failedOicdBackToLogin: "Back to login",
            failedSamlDefaultError: "There was an error during SAML login.",
            failedSamlBackToLogin: "Back to login",
            joinTenantTitle: "Join Organization",
            failedJoinTenantTitle: "Failed to Join Organization",
            failedJoinTenantBackButton: "Back to join screen",
            forceMfaTitle: "Enforce MFA",
            forceMfaMessage: "You must enable multi-factor authentication to proceed.",
            forceMfaScanQueryDescription1: "Scan the QR code with your authenticator app.",
            forceMfaScanQueryDescription2: "Then, enter the verification code to continue.",
            forceMfaInputLabel: "Enter Verification Code",
            forceMfaInputPlaceholder: "123456",
            forceMfaVerifyButton: "Verify",
            forceMfaRememberThisDevice: "Remember this device",
            forceMfaRememberLongerThenYear: "Keep me logged in for a year",
            disclaimerText: "I agree to the",
            termsLinkText: "Terms of Service",
            termsLink: "/terms",
            privacyLinkText: "Privacy Policy",
            privacyLink: "/privacy",
            termsAndPrivacyConjunctionText: "and",
            oneTouchLoginTitle: "One-Touch Login",
            oneTouchLoginMessage: "Sign in securely with one touch.",
            oneTouchLoginButton: "Use One-Touch Login",
            touchId: "Sign in with Touch ID",
            androidLoginTitle: "Android Login",
            androidLoginMessage: "Sign in securely using Android biometrics.",
            androidLoginButton: "Use Android Login",
            android: "Android",
            usbLoginTitle: "USB Security Key",
            usbLoginMessage: "Sign in with your USB security key.",
            usbLoginButton: "Use USB Security Key",
            usb: "USB",
            smsLoginTitle: "SMS Login",
            smsLoginMessage: "Sign in using a one-time code sent via SMS.",
            smsLoginButton: "Use SMS Login",
            sms: "SMS",
            smsLoginChangePhoneTitle: "Change Phone Number",
            smsLoginChangePhoneMessage: "Enter a new phone number to receive your SMS code.",
            smsLoginChangePhoneInputLabel: "New Phone Number",
            smsLoginChangePhoneButton: "Update Phone Number",
            smsLoginPinTitle: "SMS PIN",
            smsLoginPinMessage: "Enter the PIN sent to your phone.",
            smsLoginPinButton: "Submit PIN",
            loginWelcomeTitle: "Welcome Back!",
            loginWelcomeSubtitleSubtitle: "Securely log in to your account.",
            loginWelcomeKnownUserSubtitle: "Welcome, {username}! Ready to continue?",
            registerNewQuickLoginTitle: "Quick Login",
            registerNewQuickLoginTitleWithSocial: "Or register with your social account:",
            registerNewQuickLoginSubtitle: "Complete the quick registration process to get started.",
            phoneIsRequired: "Phone number is required.",
            phoneIsInvalid: "Phone number is invalid.",
            forceEnrollMfaTitle: "Enroll in MFA",
            forceEnrollMfaSubtitle: "You need to enable multi-factor authentication to continue.",
            forceEnrollMfaAuthenticatorApp: "Use an Authenticator App",
            forceEnrollMfaAuthenticatorAppDescription: "Scan the QR code with your authenticator app.",
            forceEnrollMfaSMS: "Use SMS",
            forceEnrollMfaPlatform: "Use Platform-Based Security",
            forceEnrollMfaCrossPlatform: "Cross-Platform MFA",
            forceEnrollMfaCrossPlatformDescription: "Sign in with a secure cross-platform method.",
            preEnrollMfaSMSTitle: "Enroll via SMS",
            preEnrollMfaSMSSubtitle: "Set up SMS-based multi-factor authentication.",
            preEnrollMfaSMSSubmitButtonMessage: "Submit",
            mfaSMSTitle: "SMS Multi-Factor Authentication",
            mfaSMSSubtitle: "Enter the code sent to your phone.",
            mfaSMSResendCode: "Resend code",
            enrollMfaSMSBackMessage: "Go back",
            moreWaysToAuthenticate: "More ways to authenticate",
            loginMfaSMS: "Login via SMS",
            loginMfaSMSDescription: "Enter the code sent to your phone.",
            loginMfaPlatform: "Use Platform Security",
            loginMfaPlatformDescription: "Sign in with platform-based security.",
            loginMfaCrossPlatform: "Cross-Platform MFA",
            loginMfaCrossPlatformDescription: "Sign in using cross-platform security.",
            loginMfaAuthenticatorApp: "Use Authenticator App",
            loginMfaAuthenticatorAppDescription: "Enter the code from your authenticator app.",
            loginMfaAuthenticatorAppTitle: "Authenticator App Login",
            loginMfaHelpMessage: "Need help with multi-factor authentication?",
            useRecoveryCode: "Use recovery code",
          }
        }
      },
      es: {
        loginBox: {
          login: {
            title: "Iniciar sesión",
            signUpMessage: "¿No tienes una cuenta? Regístrate aquí.",
            signUpLink: "Crear una nueva cuenta",
            forgotPassword: "¿Olvidaste tu contraseña?",
            emailInputLabel: "Dirección de correo electrónico",
            emailInputPlaceholder: "nombre@ejemplo.com",
            emailMustBeValid: "Por favor, introduce una dirección de correo válida.",
            emailIsRequired: "Se requiere dirección de correo electrónico.",
            passwordInputLabel: "Contraseña",
            passwordInputPlaceholder: "Introduce tu contraseña",
            passwordMustBeCharacters: "La contraseña debe tener al menos 8 caracteres.",
            passwordIsRequired: "Se requiere la contraseña.",
            login: "Iniciar sesión",
            continue: "Continuar"
          }
        },
        adminPortal: {
          profile: {
            pageTitle: "Título de la página de perfil",
            informationTitle: "Información básica del perfil",
            externallyManaged: "Gestionado externamente",
            externallyManagedTooltip: "Título del tooltip gestionado externamente",
            email: "Correo electrónico",
            name: "Nombre completo",
            phone: "Teléfono",
            phoneTooltip: "Tooltip del teléfono",
            address: "Dirección",
            jobTitle: "Título del trabajo",
            removeImageTitle: "Título del diálogo de eliminación de imagen de perfil",
            removeImageMessage: "Mensaje del diálogo de eliminación de imagen de perfil",
            removeImageButton: "Eliminar imagen",
            removeImageCancelButton: "Cancelar",
            uploadImage: "Subir imagen de perfil",
            removeImage: "Eliminar imagen de perfil",
            disabledEditPhoneNumberTooltip: "Tooltip para deshabilitar la edición del número de teléfono",
            phoneNumberTooltip: "Tooltip del número de teléfono",
            editAvatarButtonAriaLabel: "Editar avatar",
            myApplications: "Mis aplicaciones"
          },
          loginBox: {
            login: {
              title: "Se connecter",
              signUpMessage: "Vous n'avez pas de compte? Inscrivez-vous ici.",
              signUpLink: "Créer un nouveau compte",
              forgotPassword: "Mot de passe oublié?",
              emailInputLabel: "Adresse e-mail",
              emailInputPlaceholder: "nom@exemple.com",
              emailMustBeValid: "Veuillez entrer une adresse e-mail valide.",
              emailIsRequired: "L'adresse e-mail est requise.",
              passwordInputLabel: "Mot de passe",
              passwordInputPlaceholder: "Entrez votre mot de passe",
              passwordMustBeCharacters: "Le mot de passe doit comporter au moins 8 caractères.",
              passwordIsRequired: "Le mot de passe est requis.",
              login: "Se connecter",
              continue: "Continuer"
            }
          }
        },
      },
      fr: {
        adminPortal: {
          profile: {
            pageTitle: "Titre de la page de profil",
            informationTitle: "Informations de base sur le profil",
            externallyManaged: "Géré externement",
            externallyManagedTooltip: "Titre de la fenêtre contextuelle gérée externement",
            email: "Email",
            name: "Nom complet",
            phone: "Téléphone",
            phoneTooltip: "Info-bulle sur le téléphone",
            address: "Adresse",
            jobTitle: "Intitulé du poste",
            removeImageTitle: "Titre de la boîte de dialogue de suppression de l'image de profil",
            removeImageMessage: "Message de la boîte de dialogue de suppression de l'image de profil",
            removeImageButton: "Supprimer l'image",
            removeImageCancelButton: "Annuler",
            uploadImage: "Télécharger l'image de profil",
            removeImage: "Supprimer l'image de profil",
            disabledEditPhoneNumberTooltip: "Info-bulle pour désactiver l'édition du numéro de téléphone",
            phoneNumberTooltip: "Info-bulle sur le numéro de téléphone",
            editAvatarButtonAriaLabel: "Éditer l'avatar",
            myApplications: "Mes applications"
          },
          loginBox: {
            login: {
              title: "Se connecter",
              signUpMessage: "Vous n'avez pas de compte? Inscrivez-vous ici.",
              signUpLink: "Créer un nouveau compte",
              forgotPassword: "Mot de passe oublié?",
              emailInputLabel: "Adresse e-mail",
              emailInputPlaceholder: "nom@exemple.com",
              emailMustBeValid: "Veuillez entrer une adresse e-mail valide.",
              emailIsRequired: "L'adresse e-mail est requise.",
              passwordInputLabel: "Mot de passe",
              passwordInputPlaceholder: "Entrez votre mot de passe",
              passwordMustBeCharacters: "Le mot de passe doit comporter au moins 8 caractères.",
              passwordIsRequired: "Le mot de passe est requis.",
              login: "Se connecter",
              continue: "Continuer"
            }
          }
        },
      },
      de: {
        loginBox: {
          login: {
            title: "Anmelden",
            signUpMessage: "Noch keinen Account? Hier registrieren.",
            signUpLink: "Ein neues Konto erstellen",
            forgotPassword: "Passwort vergessen?",
            emailInputLabel: "E-Mail-Adresse",
            emailInputPlaceholder: "name@beispiel.com",
            emailMustBeValid: "Bitte geben Sie eine gültige E-Mail-Adresse ein.",
            emailIsRequired: "E-Mail-Adresse ist erforderlich.",
            passwordInputLabel: "Passwort",
            passwordInputPlaceholder: "Geben Sie Ihr Passwort ein",
            passwordMustBeCharacters: "Das Passwort muss mindestens 8 Zeichen lang sein.",
            passwordIsRequired: "Passwort ist erforderlich.",
            login: "Anmelden",
            continue: "Fortfahren"
          }
        },
        adminPortal: {
          profile: {
            pageTitle: "Profilseite Titel",
            informationTitle: "Grundlegende Profilinformationen",
            externallyManaged: "Extern verwaltet",
            externallyManagedTooltip: "Extern verwalteter Tooltip-Titel",
            email: "E-Mail",
            name: "Vollständiger Name",
            phone: "Telefon",
            phoneTooltip: "Telefon-Tooltip",
            address: "Adresse",
            jobTitle: "Berufsbezeichnung",
            removeImageTitle: "Profilbild-Löschdialog Titel",
            removeImageMessage: "Profilbild-Löschdialog Nachricht",
            removeImageButton: "Bild löschen",
            removeImageCancelButton: "Abbrechen",
            uploadImage: "Profilbild hochladen",
            removeImage: "Profilbild entfernen",
            disabledEditPhoneNumberTooltip: "Tooltip für deaktivierte Telefonnummer-Bearbeitung",
            phoneNumberTooltip: "Telefonnummer-Tooltip",
            editAvatarButtonAriaLabel: "Avatar bearbeiten",
            myApplications: "Meine Anwendungen"
          },
          loginBox: {
            login: {
              title: "Anmelden",
              signUpMessage: "Noch keinen Account? Hier registrieren.",
              signUpLink: "Ein neues Konto erstellen",
              forgotPassword: "Passwort vergessen?",
              emailInputLabel: "E-Mail-Adresse",
              emailInputPlaceholder: "name@beispiel.com",
              emailMustBeValid: "Bitte geben Sie eine gültige E-Mail-Adresse ein.",
              emailIsRequired: "E-Mail-Adresse ist erforderlich.",
              passwordInputLabel: "Passwort",
              passwordInputPlaceholder: "Geben Sie Ihr Passwort ein",
              passwordMustBeCharacters: "Das Passwort muss mindestens 8 Zeichen lang sein.",
              passwordIsRequired: "Passwort ist erforderlich.",
              login: "Anmelden",
              continue: "Fortfahren"
            }
          }
        },
      },
      it: {
        loginBox: {
          login: {
            title: "Accedi",
            signUpMessage: "Non hai un account? Registrati qui.",
            signUpLink: "Crea un nuovo account",
            forgotPassword: "Hai dimenticato la password?",
            emailInputLabel: "Indirizzo email",
            emailInputPlaceholder: "nome@esempio.com",
            emailMustBeValid: "Inserisci un indirizzo email valido.",
            emailIsRequired: "L'indirizzo email è obbligatorio.",
            passwordInputLabel: "Password",
            passwordInputPlaceholder: "Inserisci la tua password",
            passwordMustBeCharacters: "La password deve contenere almeno 8 caratteri.",
            passwordIsRequired: "La password è obbligatoria.",
            login: "Accedi",
            continue: "Continua"
          }
        },
        adminPortal: {
          profile: {
            pageTitle: "Titolo della pagina del profilo",
            informationTitle: "Informazioni di base del profilo",
            externallyManaged: "Gestito esternamente",
            externallyManagedTooltip: "Titolo del tooltip gestito esternamente",
            email: "Email",
            name: "Nome completo",
            phone: "Telefono",
            phoneTooltip: "Tooltip del telefono",
            address: "Indirizzo",
            jobTitle: "Titolo di lavoro",
            removeImageTitle: "Titolo della finestra di dialogo per la rimozione dell'immagine del profilo",
            removeImageMessage: "Messaggio della finestra di dialogo per la rimozione dell'immagine del profilo",
            removeImageButton: "Rimuovi immagine",
            removeImageCancelButton: "Annulla",
            uploadImage: "Carica immagine del profilo",
            removeImage: "Rimuovi immagine del profilo",
            disabledEditPhoneNumberTooltip: "Tooltip per la disabilitazione della modifica del numero di telefono",
            phoneNumberTooltip: "Tooltip del numero di telefono",
            editAvatarButtonAriaLabel: "Modifica avatar",
            myApplications: "Le mie applicazioni"
          },
          loginBox: {
            login: {
              title: "Se connecter",
              signUpMessage: "Vous n'avez pas de compte? Inscrivez-vous ici.",
              signUpLink: "Créer un nouveau compte",
              forgotPassword: "Mot de passe oublié?",
              emailInputLabel: "Adresse e-mail",
              emailInputPlaceholder: "nom@exemple.com",
              emailMustBeValid: "Veuillez entrer une adresse e-mail valide.",
              emailIsRequired: "L'adresse e-mail est requise.",
              passwordInputLabel: "Mot de passe",
              passwordInputPlaceholder: "Entrez votre mot de passe",
              passwordMustBeCharacters: "Le mot de passe doit comporter au moins 8 caractères.",
              passwordIsRequired: "Le mot de passe est requis.",
              login: "Se connecter",
              continue: "Continuer"
            }
          }
        }
      }
    }
  });
});

async function startServer() {
  try {
    if (useNgrok) {
      const url = await ngrok.connect(port);
      console.log(`ngrok tunnel established at ${url}`);
    } else {
      console.log(`Server is running on http://localhost:${port}`);
    }
    app.listen(port);
  } catch (err) {
    console.error('Error starting ngrok:', err);
  }
}

startServer();
