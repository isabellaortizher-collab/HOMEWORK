// data/menuData.js
// Clase para representar nodos del árbol n-ario
class MenuNode {
  constructor(id, title, link = '#', component = null) {
    this.id = id;
    this.title = title;
    this.link = link;
    this.component = component;
    this.children = [];
  }

  addChild(node) {
    this.children.push(node);
    return this;
  }
}

// Función para crear la estructura del menú
export const createMenuData = () => {
  const root = new MenuNode('root', 'Root');
  
  // Profile section
  const profile = new MenuNode('profile', 'Profile');
  
  const messages = new MenuNode('messages', 'Messages', '#messages', 'MessagesComponent');
  const settings = new MenuNode('settings', 'Settings', '#settings', 'SettingsComponent');
  
  const account = new MenuNode('account', 'Account');
  account.addChild(new MenuNode('profile-sub', 'Profile', '#profile', 'ProfileComponent'))
         .addChild(new MenuNode('security', 'Security & Privacy', '#security', 'SecurityComponent'));
  
  const password = new MenuNode('password', 'Password', '#password', 'PasswordComponent');
  const notification = new MenuNode('notification', 'Notification', '#notification', 'NotificationComponent');
  
  settings.addChild(account)
          .addChild(password)
          .addChild(notification);
  
  profile.addChild(messages)
         .addChild(settings);
  
  // Help section
  const help = new MenuNode('help', 'Help');
  
  const faqs = new MenuNode('faqs', 'FAQs', '#faqs', 'FAQsComponent');
  const submitTicket = new MenuNode('submit-ticket', 'Submit & Ticket', '#submit-ticket', 'SubmitTicketComponent');
  const networkStatus = new MenuNode('network-status', 'Network Status', '#network-status', 'NetworkStatusComponent');
  const layout = new MenuNode('layout', 'Layout', '#layout', 'LayoutComponent');
  
  help.addChild(faqs)
      .addChild(submitTicket)
      .addChild(networkStatus)
      .addChild(layout);
  
  root.addChild(profile)
      .addChild(help);
  
  return root;
};