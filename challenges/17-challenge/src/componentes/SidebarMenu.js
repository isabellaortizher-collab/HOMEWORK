import React from 'react';
import MenuTree from './MenuTree';
import styles from '../styles/SidebarMenu.module.scss';

// Datos del menú directamente aquí para evitar problemas de importación
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

const createMenuData = () => {
  const root = new MenuNode('root', 'Root');
  
  const profile = new MenuNode('profile', 'Profile');
  const messages = new MenuNode('messages', 'Messages', '#messages', 'MessagesComponent');
  const settings = new MenuNode('settings', 'Settings', '#settings', 'SettingsComponent');

  const account = new MenuNode('account', 'Account');
  account.addChild(new MenuNode('profile-sub', 'Profile', '#profile', 'ProfileComponent'))
         .addChild(new MenuNode('security', 'Security & Privacy', '#security', 'SecurityComponent'));

  const password = new MenuNode('password', 'Password', '#password', 'PasswordComponent');
  const notification = new MenuNode('notification', 'Notification', '#notification', 'NotificationComponent');

  settings.addChild(account).addChild(password).addChild(notification);
  profile.addChild(messages).addChild(settings);

  const help = new MenuNode('help', 'Help');
  help.addChild(new MenuNode('faqs', 'FAQs', '#faqs', 'FAQsComponent'))
      .addChild(new MenuNode('submit-ticket', 'Submit & Ticket', '#submit-ticket', 'SubmitTicketComponent'))
      .addChild(new MenuNode('network-status', 'Network Status', '#network-status', 'NetworkStatusComponent'))
      .addChild(new MenuNode('layout', 'Layout', '#layout', 'LayoutComponent'));

  root.addChild(profile).addChild(help);

  return root;
};

const SidebarMenu = () => {
  const menuData = createMenuData();

  return (
    <div className={styles.sidebar}>
      <h2 className={styles['sidebar-title']}>Menu</h2>
      <nav className={styles['menu-nav']}>
        <MenuTree nodes={menuData.children} />
      </nav>
    </div>
  );
};

export default SidebarMenu;
