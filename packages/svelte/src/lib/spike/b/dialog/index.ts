import Close from '../../a/dialog/dialog-close.svelte';
import Footer from '../../a/dialog/dialog-footer.svelte';
import Header from '../../a/dialog/dialog-header.svelte';
import Trigger from '../../a/dialog/dialog-trigger.svelte';
import Root from '../../a/dialog/dialog.svelte';
import Content from './dialog-content.svelte';
import Description from './dialog-description.svelte';
import Title from './dialog-title.svelte';

// Root, Trigger, Close, Header and Footer have no Bits-rendered styled elements, so they are shared with option A.
export { Root, Trigger, Close, Content, Header, Footer, Title, Description };
