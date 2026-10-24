const KEY='pocketproof_items_v1';
const $=id=>document.getElementById(id);
let items=loadItems(), toastTimer;
function loadItems(){try{return JSON.parse(localStorage.getItem(KEY)||'[]')}catch{return []}}
function persist(){localStorage.setItem(KEY,JSON.stringify(items));render()}
function esc(s=''){return String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]))}
function dateVal(s){if(!s)return null;const d=new Date(s+'T00:00:00');return Number.isNaN(d.getTime())?null:d}
function fmt(s){const d=dateVal(s);return d?new Intl.DateTimeFormat('en',{year:'numeric',month:'short',day:'numeric'}).format(d):'Not set'}
function daysTo(s){const d=dateVal(s);if(!d)return null;return Math.ceil((d-new Date(new Date().toDateString()))/86400000)}
function warrantyStatus(item){const n=daysTo(item.warrantyDate);if(n===null)return {label:'NO WARRANTY DATE',cls:'',active:false,soon:false};if(n<0)return {label:'EXPIRED',cls:'expired',active:false,soon:false};if(n<=30)return {label:n===0?'EXPIRES TODAY':`EXPIRES IN ${n}D`,cls:'soon',active:true,soon:true};return {label:'ACTIVE WARRANTY',cls:'',active:true,soon:false}}
function iconFor(cat){return ({Electronics:'⌘','Home appliance':'⌂',Furniture:'▤',Vehicle:'◇',Other:'▣'})[cat]||'▣'}
function render(){
 const q=$('search').value.trim().toLowerCase();
 const filtered=items.filter(x=>[x.name,x.brand,x.serial,x.category,x.notes].join(' ').toLowerCase().includes(q));
 $('totalCount').textContent=items.length;
 $('activeCount').textContent=items.filter(x=>warrantyStatus(x).active).length;
 $('soonCount').textContent=items.filter(x=>warrantyStatus(x).soon).length;
 $('itemPill').textContent=`${items.length} item${items.length===1?'':'s'}`;
 $('empty').style.display=filtered.length?'none':'block';
 if(items.length && !filtered.length){$('empty').style.display='block';$('empty').innerHTML='<div class="emptyicon">⌕</div><h3>No matches found</h3><p>Try another search term.</p>'}
 if(!items.length){$('empty').innerHTML='<div class="emptyicon">▣</div><h3>Your vault starts here</h3><p>Add a laptop, phone, appliance, or anything you want to keep track of.</p><button id="emptyAdd" class="secondary">Add your first item</button>';$('emptyAdd').onclick=()=>openForm()}
 $('items').innerHTML=filtered.map(x=>{const st=warrantyStatus(x);return `<article class="itemcard"><div class="itemtop"><div class="itemicon">${iconFor(x.category)}</div><div class="itemmain"><h3>${esc(x.name)}</h3><div class="subline">${esc([x.brand,x.category].filter(Boolean).join(' · '))}</div>${x.serial?`<div class="subline">Serial: ${esc(x.serial)}</div>`:''}</div><span class="status ${st.cls}">${st.label}</span></div><div class="details"><div class="detail"><span>Purchased</span><strong>${fmt(x.purchaseDate)}</strong></div><div class="detail"><span>Warranty expiry</span><strong>${fmt(x.warrantyDate)}</strong></div>${x.price?`<div class="detail"><span>Purchase price</span><strong>${esc(x.price)}</strong></div>`:''}</div>${x.notes?`<p class="notes">${esc(x.notes)}</p>`:''}<div class="cardactions"><button class="smallbtn" data-edit="${x.id}">Edit</button><button class="smallbtn delete" data-delete="${x.id}">Delete</button></div></article>`}).join('');
}
function openForm(item=null){$('itemForm').reset();$('itemId').value=item?.id||'';$('modalTitle').textContent=item?'Edit item':'Add an item';if(item){for(const k of ['name','brand','category','serial','purchaseDate','warrantyDate','price','notes'])$(k).value=item[k]||''}$('modal').classList.remove('hidden');setTimeout(()=>$('name').focus(),100)}
function closeForm(){$('modal').classList.add('hidden')}
function toast(msg){$('toast').textContent=msg;$('toast').classList.add('show');clearTimeout(toastTimer);toastTimer=setTimeout(()=>$('toast').classList.remove('show'),2500)}
$('addTop').onclick=()=>openForm();$('emptyAdd').onclick=()=>openForm();$('closeModal').onclick=closeForm;$('cancel').onclick=closeForm;$('search').addEventListener('input',render);
$('modal').addEventListener('click',e=>{if(e.target===$('modal'))closeForm()});
document.addEventListener('keydown',e=>{if(e.key==='Escape')closeForm()});
$('itemForm').addEventListener('submit',e=>{e.preventDefault();const id=$('itemId').value||crypto.randomUUID();const item={id};for(const k of ['name','brand','category','serial','purchaseDate','warrantyDate','price','notes'])item[k]=$(k).value.trim();const ix=items.findIndex(x=>x.id===id);if(ix>=0)items[ix]=item;else items.unshift(item);persist();closeForm();toast(ix>=0?'Item updated':'Item saved')});
$('items').addEventListener('click',e=>{const edit=e.target.closest('[data-edit]'),del=e.target.closest('[data-delete]');if(edit){const item=items.find(x=>x.id===edit.dataset.edit);if(item)openForm(item)}if(del){const item=items.find(x=>x.id===del.dataset.delete);if(item&&confirm(`Delete “${item.name}”? This cannot be undone.`)){items=items.filter(x=>x.id!==item.id);persist();toast('Item deleted')}}});
$('exportBtn').onclick=()=>{const blob=new Blob([JSON.stringify({app:'PocketProof',version:1,exportedAt:new Date().toISOString(),items},null,2)],{type:'application/json'});const url=URL.createObjectURL(blob),a=document.createElement('a');a.href=url;a.download='pocketproof-backup.json';a.click();URL.revokeObjectURL(url);toast('Backup export started')};
if('serviceWorker' in navigator && location.protocol.startsWith('http'))navigator.serviceWorker.register('./sw.js').catch(()=>{});
render();
