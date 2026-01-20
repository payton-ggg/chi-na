"use client";

import Link from "next/link";
import {
  Instagram,
  Facebook,
  Twitter,
  Mail,
  Phone,
  MapPin,
} from "lucide-react";

export default function Footer() {
  return (
    <footer id="contact" className="bg-gray-900 text-white pt-20 pb-10">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          {/* Brand */}
          <div>
            <Link
              href="/"
              className="text-2xl font-bold tracking-tighter block mb-6"
            >
              TSUNAMI<span className="text-primary-scarlet-500">TRAVEL</span>
            </Link>
            <p className="text-gray-400 mb-6 leading-relaxed">
              Ваш премиальный проводник в мир Китая. Авторские туры,
              индивидуальный подход и безупречный сервис.
            </p>
            <div className="flex gap-4">
              <a
                href="#"
                className="text-gray-400 hover:text-white transition-colors"
              >
                <Instagram size={20} />
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-white transition-colors"
              >
                <Facebook size={20} />
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-white transition-colors"
              >
                <Twitter size={20} />
              </a>
            </div>
          </div>

          {/* Links */}
          <div>
            <h4 className="text-lg font-bold mb-6">Компания</h4>
            <ul className="space-y-4">
              <li>
                <Link
                  href="#"
                  className="text-gray-400 hover:text-primary-scarlet-400 transition-colors"
                >
                  О нас
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-gray-400 hover:text-primary-scarlet-400 transition-colors"
                >
                  Команда
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-gray-400 hover:text-primary-scarlet-400 transition-colors"
                >
                  Вакансии
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-gray-400 hover:text-primary-scarlet-400 transition-colors"
                >
                  Блог о Китае
                </Link>
              </li>
            </ul>
          </div>

          {/* Tours */}
          <div>
            <h4 className="text-lg font-bold mb-6">Туры</h4>
            <ul className="space-y-4">
              <li>
                <Link
                  href="#"
                  className="text-gray-400 hover:text-primary-scarlet-400 transition-colors"
                >
                  Экскурсионные
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-gray-400 hover:text-primary-scarlet-400 transition-colors"
                >
                  Гастрономические
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-gray-400 hover:text-primary-scarlet-400 transition-colors"
                >
                  Бизнес-туры
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-gray-400 hover:text-primary-scarlet-400 transition-colors"
                >
                  Индивидуальные
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-lg font-bold mb-6">Контакты</h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3 text-gray-400">
                <MapPin
                  size={20}
                  className="text-primary-scarlet-500 mt-1 shrink-0"
                />
                <span>
                  Москва, Пресненская наб., 12
                  <br />
                  Башня Федерация
                </span>
              </li>
              <li className="flex items-center gap-3 text-gray-400">
                <Phone
                  size={20}
                  className="text-primary-scarlet-500 shrink-0"
                />
                <span>+7 (999) 000-00-00</span>
              </li>
              <li className="flex items-center gap-3 text-gray-400">
                <Mail size={20} className="text-primary-scarlet-500 shrink-0" />
                <span>hello@tsunamitravel.ru</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center text-sm text-gray-500">
          <p>&copy; 2026 TSUNAMI TRAVEL. Все права защищены.</p>
          <div className="flex gap-6 mt-4 md:mt-0">
            <Link href="#" className="hover:text-white transition-colors">
              Политика конфиденциальности
            </Link>
            <Link href="#" className="hover:text-white transition-colors">
              Условия использования
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
