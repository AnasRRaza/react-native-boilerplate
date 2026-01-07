import React, { useCallback, useEffect, useState } from 'react';
import {
  ActivityIndicator,
  Platform,
  TouchableOpacity,
  View,
} from 'react-native';
import {
  Bubble,
  BubbleProps,
  GiftedChat,
  IMessage,
} from 'react-native-gifted-chat';
import { moderateScale, verticalScale } from 'react-native-size-matters';
import Icon from 'react-native-vector-icons/Ionicons';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { makeStyles, Text } from '@rneui/themed';
import { useQueryClient } from '@tanstack/react-query';

import { Input } from '@/components';
import { useGetMessages } from '@/hooks/chat/useGetMessages';
import { useSocket } from '@/hooks/chat/useSocket';
import { useAuthStore } from '@/store/authStore';
import { Message } from '@/types/chat';
import { APP_ROUTES, MainStackNavigatorParamList } from '@/types/routes';

import { ChatAvatar } from './components';

interface Props
  extends NativeStackScreenProps<
    MainStackNavigatorParamList,
    typeof APP_ROUTES.CHAT_CONVERSATION
  > {}

const ChatConversation = ({ route, navigation }: Props) => {
  const { otherUserId, userName, userImage } = route.params;
  const [messages, setMessages] = useState<IMessage[]>([]);
  const [messageText, setMessageText] = useState('');

  const { user } = useAuthStore();
  const socket = useSocket(user?._id || '');
  const {
    data: messagesData,
    isLoading: isLoadingMessages,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useGetMessages(otherUserId);
  const queryClient = useQueryClient();

  const styles = useStyles();

  useEffect(() => {
    return () => {
      queryClient.removeQueries({ queryKey: ['messages', otherUserId] });
    };
  }, [queryClient, otherUserId]);

  useEffect(() => {
    if (messagesData?.pages) {
      const allMessages = messagesData.pages.flatMap(page => page.messages);
      const convertedMessages = allMessages.map((message: Message) => ({
        _id: message._id || '',
        text: message.message,
        createdAt: new Date(message.createdAt),
        user: {
          _id:
            typeof message.senderId === 'string'
              ? message.senderId
              : message.senderId._id,
          name: userName,
          avatar: userImage || undefined,
        },
      }));

      setMessages(convertedMessages);
    }
  }, [messagesData, userName, userImage]);

  const handleLoadEarlier = useCallback(async () => {
    if (hasNextPage && !isFetchingNextPage) {
      await fetchNextPage();
    }
  }, [hasNextPage, isFetchingNextPage, fetchNextPage]);

  useEffect(() => {
    if (!socket) {
      return;
    }

    socket.on('receive_private_message', (msg: Message) => {
      const convertedMessage = {
        _id: msg._id || '',
        text: msg.message,
        createdAt: new Date(msg.createdAt),
        user: {
          _id:
            typeof msg.senderId === 'string' ? msg.senderId : msg.senderId._id,
          name: userName,
          avatar: userImage || undefined,
        },
      };

      setMessages(prev => {
        return GiftedChat.append(prev, [convertedMessage]);
      });
    });
  }, [socket, userName, userImage]);

  const handleSendMessage = useCallback(() => {
    if (messageText.trim()) {
      const newMessage = {
        _id: Date.now().toString(),
        text: messageText.trim(),
        createdAt: new Date(),
        user: {
          _id: user?._id || '',
          name: user?.fullName || '',
          avatar: user?.profilePicture?.path || '',
        },
      };

      setMessages(prev => GiftedChat.append(prev, [newMessage]));

      socket?.emit('send_private_message', {
        senderId: user?._id,
        recipientId: otherUserId,
        content: messageText.trim(),
      });

      setMessageText('');
    }
  }, [messageText, user, socket, otherUserId]);

  const onSend = useCallback(
    (newMessages: IMessage[] = []) => {
      setMessages(previousMessages =>
        GiftedChat.append(previousMessages, newMessages),
      );
      socket?.emit('send_private_message', {
        senderId: user?._id,
        recipientId: otherUserId,
        content: newMessages?.[0]?.text,
      });
    },
    [socket, user, otherUserId],
  );

  const renderBubble = useCallback(
    (props: BubbleProps<IMessage>) => {
      return (
        <Bubble
          {...props}
          wrapperStyle={{
            right: styles.bubbleWrapperRight,
            left: styles.bubbleWrapperLeft,
          }}
          containerStyle={{
            right: styles.containerRight,
            left: styles.containerLeft,
          }}
          textStyle={{
            right: styles.textStyleRight,
            left: styles.textStyleLeft,
          }}
        />
      );
    },
    [styles],
  );

  const handleBack = useCallback(() => {
    navigation.goBack();
  }, [navigation]);

  const renderInputToolbar = useCallback(() => {
    return (
      <View style={styles.inputToolbar}>
        <View style={styles.inputToolbarContainer}>
          <Input
            value={messageText}
            onChangeText={setMessageText}
            renderErrorMessage={false}
            placeholder="Type a message..."
            textAlignVertical="top"
            multiline
            numberOfLines={1}
          />
        </View>
        <TouchableOpacity style={styles.sendButton} onPress={handleSendMessage}>
          <Icon name="send" size={moderateScale(20)} color="#FFFFFF" />
        </TouchableOpacity>
      </View>
    );
  }, [messageText, handleSendMessage, styles]);

  const renderLoading = useCallback(() => {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator color="#4CAF50" />
      </View>
    );
  }, [styles]);

  const renderLoadEarlier = useCallback(() => {
    if (isFetchingNextPage) {
      return renderLoading();
    }

    return null;
  }, [isFetchingNextPage, renderLoading]);

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={handleBack}>
          <Icon name="chevron-back" size={34} color="#000000" />
        </TouchableOpacity>

        <View style={styles.userInfo}>
          <ChatAvatar name={userName} imageUrl={userImage} size="medium" />
          <View style={styles.userDetails}>
            <Text style={styles.userName}>{userName}</Text>
          </View>
        </View>
      </View>

      {/* Loading State */}
      {isLoadingMessages ? (
        <View style={styles.loadingFullContainer}>
          <ActivityIndicator size="large" color="#4CAF50" />
        </View>
      ) : null}

      {/* GiftedChat */}
      {!isLoadingMessages ? (
        <GiftedChat
          messages={messages}
          renderLoading={renderLoading}
          onSend={onSend}
          user={{
            _id: user?._id || '',
            name: user?.fullName || '',
          }}
          renderBubble={renderBubble}
          textInputProps={{
            placeholder: 'Type a message...',
          }}
          renderInputToolbar={renderInputToolbar}
          showAvatarForEveryMessage={false}
          onLoadEarlier={handleLoadEarlier}
          loadEarlier={hasNextPage || false}
          isLoadingEarlier={isFetchingNextPage}
          infiniteScroll
          renderLoadEarlier={renderLoadEarlier}
        />
      ) : null}
      <View style={styles.spacer} />
    </View>
  );
};

export default ChatConversation;

const useStyles = makeStyles(theme => ({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: verticalScale(12),
    paddingLeft: theme.spacing.md,
    paddingRight: theme.spacing.lg,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E5E5',
  },
  backButton: {
    marginRight: moderateScale(6),
  },
  userInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: moderateScale(12),
    flex: 1,
  },
  userDetails: {
    flex: 1,
  },
  userName: {
    fontSize: moderateScale(16),
    fontWeight: '600',
    color: theme.colors.black,
  },
  bubbleWrapperRight: {
    padding: moderateScale(8),
    backgroundColor: theme.colors.primary,
    borderRadius: moderateScale(20),
    borderBottomRightRadius: moderateScale(4),
    marginBottom: moderateScale(8),
  },
  bubbleWrapperLeft: {
    padding: moderateScale(8),
    backgroundColor: '#333333',
    borderRadius: moderateScale(20),
    borderBottomLeftRadius: moderateScale(4),
    marginBottom: moderateScale(8),
  },
  containerRight: {
    justifyContent: 'flex-end',
  },
  containerLeft: {
    justifyContent: 'flex-start',
  },
  textStyleRight: {
    color: '#FFFFFF',
    fontSize: moderateScale(16),
  },
  textStyleLeft: {
    color: '#FFFFFF',
    fontSize: moderateScale(16),
  },
  sendButton: {
    backgroundColor: theme.colors.primary,
    borderRadius: moderateScale(20),
    width: moderateScale(40),
    height: moderateScale(40),
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: moderateScale(8),
  },
  inputToolbar: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: moderateScale(16),
    backgroundColor: theme.colors.background,
    gap: moderateScale(12),
  },
  inputToolbarContainer: {
    width: '85%',
  },
  spacer: {
    height: Platform.OS === 'ios' ? 24 : 10,
  },
  loadingContainer: {
    padding: moderateScale(16),
    alignItems: 'center',
  },
  loadingFullContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
}));
