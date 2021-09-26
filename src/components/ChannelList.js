import { FaPen } from 'react-icons/fa';

function ChannelList(props) {
    return (
        <div className="channel-list">
            <ul>
                <h3>Message Channels</h3>
                {[...props.channels].map(channel => {
                    const active = channel.channel_id ===  props.channelId ? 'active'  : '';
                    return (
                        <li key={channel.channel_id} className={"channel " + active}>
                            <a onClick={() => props.selectChannel(channel.channel_id)} 
                            href="/#">
                                <FaPen className="channel-list-pen"/>{channel.channel_name}
                            </a>
                        </li>
                    )
                })} 
            </ul>
        </div>
    );
}

export default ChannelList