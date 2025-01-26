 
import { faSearch, faXmark } from '@fortawesome/free-solid-svg-icons';
import { useState } from 'react';
import { Message as MessageType } from '../../api/quorumApi';
import { useMessageDB } from '../context/MessageDB';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './Searcher.scss';

type ChannelListProps = { spaceId: string; messagesSearchedParent: (data: MessageType[]) => void; sendDataToParent: (data: boolean) => void };
export const Searcher: React.FC<ChannelListProps> = ({ spaceId, messagesSearchedParent, sendDataToParent }) => {

    const [showMessages, setshowMessages] = useState(false);
    const [searchText, setSearchText] = useState('');
    const { searchMessage } = useMessageDB();

 const handleSearch = async () => {
     console.log('Buscando:', searchText);
     const result = await searchMessage(spaceId, searchText);
     
     console.log('Numero de mensajes:', result);
     messagesSearchedParent(result);
     sendDataToParent(!showMessages);
     setshowMessages(!showMessages);
     setSearchText(showMessages ? '' : searchText);
    //  onSearch(searchedMessages);
   };
 
   return (
        <div className="relative inline-flex float-right h-6">
            <input
              type="text" 
              className="searcher max-w-60"
              placeholder="Search..."
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
              onKeyDown={(e) => {
              if (e.key === 'Enter') {
                handleSearch();
              }
              }}
            />
            <FontAwesomeIcon 
              icon={showMessages ? faXmark : faSearch}
              className="w-3.5 p-1 absolute right-3 hover:bg-[rgba(255,255,255,0.2)] cursor-pointer"
              onClick={() => {
              handleSearch();
              }}
            />
            </div>
            
        
        // <div
        //   className={
        //     'message-list' + (!showUsers ? ' message-list-expanded' : '')
        //   }
        // >
        //   <MessageList
        //     isRepudiable={space?.isRepudiable}
        //     roles={roles}
        //     canDeleteMessages={canDeleteMessages}
        //     isSpaceOwner={isSpaceOwner}
        //     editor={editor}
        //     messageList={messageList}
        //     setInReplyTo={setInReplyTo}
        //     customEmoji={space?.emojis}
        //     members={members}
        //     submitMessage={submit}
        //     fetchPreviousPage={() => {
        //       fetchPreviousPage();
        //     }}
        //   />
        // </div> 
        )

}