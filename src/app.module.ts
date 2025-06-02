import { Module } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { TypeOrmModule } from "@nestjs/typeorm";
// import { GraphQLModule } from "@nestjs/graphql";
// import { ApolloDriver, ApolloDriverConfig } from "@nestjs/apollo";
import { UsersModule } from './users/users.module';
// import { CommentsModule } from './comments/comments.module';
import { AuthModule } from './auth/auth.module';
import { TagsModule } from './tags/tags.module';
import { PlaylistsModule } from './playlists/playlists.module';
import { VideoModule } from './video/video.module';
import { CategoriesModule } from './categories/categories.module';
import { ChannelsModule } from './channels/channels.module';
import { NotificationsModule } from './notifications/notifications.module';
import { SubscriptionsModule } from './subscriptions/subscriptions.module';
import { AdminModule } from './admin/admin.module';
import { WatchHistoryModule } from './watch_history/watch_history.module';
import { ReportModule } from './report/report.module';
import { PremiumPlansModule } from './premium_plans/premium_plans.module';
import { PremiumSubscriptionsModule } from './premium_subscriptions/premium_subscriptions.module';
import { PaymentModule } from './payment/payment.module';
import { LikesModule } from './likes/likes.module';
import { CommentsModule } from './comments/comments.module';
import { VideoTagsModule } from './video_tags/video_tags.module';
import { PlaylistVideoModule } from './playlist_video/playlist_video.module';
import { MailModule } from './mail/mail.module';
@Module({
  imports: [
    ConfigModule.forRoot({ envFilePath: ".env", isGlobal: true }),
    // GraphQLModule.forRoot<ApolloDriverConfig>({
    //   driver: ApolloDriver,
    //   autoSchemaFile: "schema.gql",
    //   sortSchema: true,
    //   playground: true,
    // }),

    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (config: ConfigService) => ({
        type: config.get<"postgres">("DB_CONNECTION"),
        host: config.get<string>("DB_HOST"),
        username: config.get<string>("DB_USERNAME"),
        password: config.get<string>("DB_PASSWORD"),
        port: config.get<number>("DB_PORT"),
        database: config.get<string>("DB_NAME"),
        entities: [__dirname + "dist/**/*.entity{.ts,.js"],
        synchronize: true,
        autoLoadEntities: true,
        logging: true,
      }),
    }),
    UsersModule,
    
    // CommentsModule,
    AuthModule,
    TagsModule,
    PlaylistsModule,
    VideoModule,
    CategoriesModule,
    ChannelsModule,
    NotificationsModule,
    SubscriptionsModule,
    AdminModule,
    WatchHistoryModule,
    ReportModule,
    PremiumPlansModule,
    PremiumSubscriptionsModule,
    PaymentModule,
    LikesModule,
    CommentsModule,
    VideoTagsModule,
    PlaylistVideoModule,
    MailModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
