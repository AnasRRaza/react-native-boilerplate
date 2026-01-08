import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { moderateScale } from 'react-native-size-matters';
import Icon from 'react-native-vector-icons/Ionicons';
import { formatDistanceToNow } from 'date-fns';

import { Conversation } from '@/types/chat';

import ChatAvatar from './Avatar';

interface ConversationItemProps {
  conversation: Conversation;
  currentUserId: string;
  onPress: (conversation: Conversation) => void;
}

const ConversationItem: React.FC<ConversationItemProps> = ({
  conversation,
  currentUserId,
  onPress,
}) => {
  const isOwnMessage = conversation.lastMessage.senderId === currentUserId;
  const isUnread = !conversation.lastMessage.isRead && !isOwnMessage;

  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() => onPress(conversation)}
      activeOpacity={0.7}>
      <View style={styles.avatarContainer}>
        <ChatAvatar
          name={conversation.otherParticipant.name}
          imageUrl={conversation.otherParticipant.profileImage}
          size="medium"
        />
      </View>

      <View style={styles.content}>
        <View style={styles.header}>
          <Text style={styles.userName} numberOfLines={1}>
            {conversation.otherParticipant.name}
          </Text>
          <Text style={styles.timeText}>
            {formatDistanceToNow(new Date(conversation.lastMessage.createdAt), {
              addSuffix: true,
            })}
          </Text>
        </View>
        <View style={styles.messageRow}>
          {conversation.lastMessage.message ? (
            <Text style={styles.lastMessage} numberOfLines={1}>
              {isOwnMessage ? 'You: ' : ''}
              {conversation.lastMessage.message}
            </Text>
          ) : (
            <Text style={styles.lastMessagePlaceholder}>No messages yet</Text>
          )}
          {isUnread ? (
            <View style={styles.unreadBadge}>
              <View style={styles.unreadDot} />
            </View>
          ) : null}
        </View>
      </View>

      <View style={styles.chevronContainer}>
        <Icon name="chevron-forward" size={moderateScale(20)} color="#FFFFFF" />
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: moderateScale(16),
    borderBottomWidth: moderateScale(1),
    borderBottomColor: 'rgba(255, 255, 255, 0.1)',
  },
  avatarContainer: {
    marginRight: moderateScale(12),
  },
  content: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: moderateScale(4),
  },
  userName: {
    flex: 1,
    fontSize: moderateScale(16),
    fontWeight: '600',
    color: '#FFFFFF',
    marginRight: moderateScale(8),
  },
  timeText: {
    fontSize: moderateScale(12),
    color: '#666666',
  },
  messageRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  lastMessage: {
    flex: 1,
    fontSize: moderateScale(14),
    color: '#999999',
    marginRight: moderateScale(8),
  },
  lastMessagePlaceholder: {
    flex: 1,
    fontSize: moderateScale(14),
    color: '#666666',
    fontStyle: 'italic',
  },
  unreadBadge: {
    width: moderateScale(10),
    height: moderateScale(10),
    justifyContent: 'center',
    alignItems: 'center',
  },
  unreadDot: {
    width: moderateScale(8),
    height: moderateScale(8),
    borderRadius: moderateScale(4),
    backgroundColor: '#4CAF50',
  },
  chevronContainer: {
    marginLeft: moderateScale(8),
  },
});

export default ConversationItem;
